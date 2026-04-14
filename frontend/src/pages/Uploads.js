import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topN, setTopN] = useState(5); // 🔥 Added Top N state

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before analyzing.");
      return;
    }

    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/analyze",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      if (err.response) {
        setError("Server error. Please try again.");
      } else if (err.request) {
        setError("Unable to connect to server.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-page dashboard">
      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-navbar">
          <h2>Upload Your Dataset</h2>

          <div className="upload-controls">
            <label className="upload-button">
              <FiUpload size={18} />
              {file ? file.name : "Choose File"}
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.pdf"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <button
              className="analyze-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-wrapper">
                  <span className="spinner"></span>
                  Analyzing...
                </span>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Top N Dropdown */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <label style={{ marginRight: "10px", color: "white" }}>
            Select Top N (States & Cities):
          </label>

          <select
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Top {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Box */}
      {error && <div className="error-box">{error}</div>}

      {/* Results Section */}
      {result && (
        <section className="results-section">
          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <h3>Total Revenue</h3>
              <p>₹{result?.total_revenue?.toLocaleString()}</p>
            </div>

            <div className="kpi-card">
              <h3>Total Orders</h3>
              <p>{result?.total_orders}</p>
            </div>

            <div className="kpi-card">
              <h3>Avg Order Value</h3>
              <p>₹{result?.avg_order_value?.toFixed(2)}</p>
            </div>
          </div>

          {/* Monthly Sales */}
          {result?.monthly_sales && (
            <div className="chart-section">
              <h2>Monthly Sales Trend</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={result.monthly_sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="YearMonth" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top States */}
          {result?.top_states && (
            <div className="chart-section">
              <h2>Top {topN} States</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={result.top_states.slice(0, topN)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="State" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      `₹ ${value?.toLocaleString()}`
                    }
                  />
                  <Bar dataKey="Sales" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Cities - Vertical Layout */}
          {result?.top_cities && (
            <div className="chart-section">
              <h2>Top {topN} Cities by Sales</h2>

              <ResponsiveContainer width="100%" height={450}>
                <BarChart
                  layout="vertical"
                  data={result.top_cities.slice(0, topN)}
                  margin={{ top: 20, right: 40, left: 120, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      `₹${value?.toLocaleString()}`
                    }
                  />

                  <YAxis
                    dataKey="City"
                    type="category"
                    width={180}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `₹ ${value?.toLocaleString()}`
                    }
                  />

                  <Bar
                    dataKey="Sales"
                    fill="#ec4899"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      )}
    </section>
  );
}

export default Upload;

















