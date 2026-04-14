# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# import io
# import pdfplumber

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "Sales Analytics Backend Running 🚀"}


# @app.post("/analyze")
# async def analyze(file: UploadFile = File(...), top_n: int = 10):

#     contents = await file.read()
#     file_extension = file.filename.split(".")[-1].lower()

#     # ---------------- READ FILE BASED ON TYPE ---------------- #

#     # CSV
#     if file_extension == "csv":
#         df = pd.read_csv(io.BytesIO(contents))

#     # Excel
#     elif file_extension in ["xlsx", "xls"]:
#         df = pd.read_excel(io.BytesIO(contents))

#     # PDF (table-based)
#     elif file_extension == "pdf":
#         with pdfplumber.open(io.BytesIO(contents)) as pdf:
#             tables = []

#             for page in pdf.pages:
#                 table = page.extract_table()
#                 if table:
#                     tables.extend(table)

#         if not tables:
#             return {"error": "No tables detected in PDF."}

#         df = pd.DataFrame(tables[1:], columns=tables[0])

#     else:
#         return {"error": "Unsupported file format. Upload CSV, Excel, or PDF."}

#     # ---------------- DATA CLEANING ---------------- #

#     df.columns = df.columns.str.strip()

#     # Ensure required columns exist
#     required_columns = [
#         "Order Date", "Sales", "Region",
#         "Segment", "State", "City", "Product Name"
#     ]

#     for col in required_columns:
#         if col not in df.columns:
#             return {"error": f"Missing required column: {col}"}

#     df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")
#     df["Sales"] = pd.to_numeric(df["Sales"], errors="coerce")

#     df = df.dropna(subset=["Order Date", "Sales"])

#     # ---------------- ANALYTICS ---------------- #

#     total_revenue = df["Sales"].sum()
#     total_orders = len(df)
#     avg_order_value = df["Sales"].mean()

#     df["YearMonth"] = df["Order Date"].dt.to_period("M").astype(str)

#     monthly_sales = (
#         df.groupby("YearMonth")["Sales"]
#         .sum()
#         .reset_index()
#         .sort_values("YearMonth")
#         .to_dict(orient="records")
#     )

#     regional_sales = (
#         df.groupby(["Region", "Segment"])["Sales"]
#         .sum()
#         .reset_index()
#         .pivot(index="Region", columns="Segment", values="Sales")
#         .fillna(0)
#         .reset_index()
#         .to_dict(orient="records")
#     )

#     top_states = (
#         df.groupby("State")["Sales"]
#         .sum()
#         .reset_index()
#         .sort_values("Sales", ascending=False)
#         .head(top_n)
#         .to_dict(orient="records")
#     )

#     top_cities = (
#         df.groupby("City")["Sales"]
#         .sum()
#         .reset_index()
#         .sort_values("Sales", ascending=False)
#         .head(top_n)
#         .to_dict(orient="records")
#     )

#     top_products = (
#     df.groupby("Product Name")["Sales"]
#       .sum()
#       .reset_index()
#       .sort_values("Sales", ascending=False)
#       .head(top_n)
#       .to_dict(orient="records")
# )

#     return {
#         "total_revenue": float(total_revenue),
#         "total_orders": total_orders,
#         "avg_order_value": float(avg_order_value),
#         "monthly_sales": monthly_sales,
#         "regional_sales": regional_sales,
#         "top_states": top_states,
#         "top_cities": top_cities,
#         "top_products": top_products
#     }







from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import pdfplumber

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Sales Analytics Backend Running 🚀"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...), top_n: int = 10):

    contents = await file.read()
    file_extension = file.filename.split(".")[-1].lower()

    # ---------------- READ FILE ---------------- #

    if file_extension == "csv":
        df = pd.read_csv(io.BytesIO(contents))

    elif file_extension in ["xlsx", "xls"]:
        df = pd.read_excel(io.BytesIO(contents))

    elif file_extension == "pdf":
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            tables = []
            for page in pdf.pages:
                table = page.extract_table()
                if table:
                    tables.extend(table)

        if not tables:
            return {"error": "No tables detected in PDF."}

        df = pd.DataFrame(tables[1:], columns=tables[0])

    else:
        return {"error": "Unsupported file format. Upload CSV, Excel, or PDF."}

    # ---------------- CLEANING ---------------- #

    df.columns = df.columns.str.strip()

    required_columns = [
        "Order Date",
        "Sales",
        "Region",
        "Segment",
        "State",
        "City",
        "Product Name",
        "Order ID",
    ]

    for col in required_columns:
        if col not in df.columns:
            return {"error": f"Missing required column: {col}"}

    df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")
    df["Sales"] = pd.to_numeric(df["Sales"], errors="coerce")

    df = df.dropna(subset=["Order Date", "Sales"])

    # ---------------- KPIs ---------------- #

    total_revenue = df["Sales"].sum()
    total_orders = df["Order ID"].nunique()
    avg_order_value = df["Sales"].mean()

    # ---------------- MONTHLY SALES ---------------- #

    df["YearMonth"] = df["Order Date"].dt.to_period("M")
    monthly_df = (
        df.groupby("YearMonth")["Sales"]
        .sum()
        .reset_index()
        .sort_values("YearMonth")
    )

    monthly_df["YearMonth"] = monthly_df["YearMonth"].astype(str)

    monthly_sales = monthly_df.to_dict(orient="records")

    # ---------------- REGIONAL SALES ---------------- #

    regional_sales = (
        df.groupby(["Region", "Segment"])["Sales"]
        .sum()
        .reset_index()
        .pivot(index="Region", columns="Segment", values="Sales")
        .fillna(0)
        .reset_index()
        .to_dict(orient="records")
    )

    # ---------------- TOP PERFORMERS ---------------- #

    top_states = (
        df.groupby("State")["Sales"]
        .sum()
        .reset_index()
        .sort_values("Sales", ascending=False)
        .head(top_n)
        .to_dict(orient="records")
    )

    top_cities = (
        df.groupby("City")["Sales"]
        .sum()
        .reset_index()
        .sort_values("Sales", ascending=False)
        .head(top_n)
        .to_dict(orient="records")
    )

    top_products = (
        df.groupby("Product Name")["Sales"]
        .sum()
        .reset_index()
        .sort_values("Sales", ascending=False)
        .head(5)
        .to_dict(orient="records")
    )

    return {
        "total_revenue": float(total_revenue),
        "total_orders": int(total_orders),
        "avg_order_value": float(avg_order_value),
        "monthly_sales": monthly_sales,
        "regional_sales": regional_sales,
        "top_states": top_states,
        "top_cities": top_cities,
        "top_products": top_products,
    }