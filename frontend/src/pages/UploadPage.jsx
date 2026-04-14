import React, { useState } from "react";
import axios from "axios";
import "./UploadPage.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [topN, setTopN] = useState(5);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a dataset first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setResults(null);

      const response = await axios.post(
        `http://localhost:8000/analyze?top_n=${topN}`,
        formData
      );

      setResults(response.data);
    } catch (err) {
      setError("Something went wrong while analyzing the dataset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      {/* Upload Section */}
      <div className="upload-card">
        <h1>Upload Dataset</h1>
        <p>Upload your CSV or Excel file to generate analytics insights.</p>

        <label
          className="upload-box"
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleUpload}
            hidden
          />

          <div className="upload-content">
            <div className="upload-icon">⬆</div>
            <p>Drag & Drop your dataset</p>
            <span>or click to browse files</span>
          </div>
        </label>

        {file && (
          <div className="file-name">
            Selected file: <strong>{file.name}</strong>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="analyze-btn"
        >
          {loading ? "Analyzing..." : "Analyze Dataset"}
        </button>

        {/* Top N Selector */}
        {results && (
          <div className="topn-selector">
            <label>Select Top N (States & Cities):</label>

            <select
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Top {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && <div className="error-box">{error}</div>}
      </div>

      {/* Results Section */}
      {results && (
        <div className="results-section">

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <h3>Total Revenue</h3>
              <p>₹ {results?.total_revenue?.toLocaleString()}</p>
            </div>

            <div className="kpi-card">
              <h3>Total Orders</h3>
              <p>{results.total_orders}</p>
            </div>

            <div className="kpi-card">
              <h3>Average Order Value</h3>
              <p>₹ {results?.avg_order_value?.toLocaleString()}</p>
            </div>
          </div>

          {/* Monthly Revenue */}
          {results.monthly_sales && (
            <div className="chart-section">
              <h3>Monthly Revenue</h3>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={results.monthly_sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="YearMonth" tick={{ fill: "#ffffff" }} />
                  <YAxis tick={{ fill: "#ffffff" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Products */}
          {results.top_products && (
            <div className="chart-section">
              <h3>Top 5 Products</h3>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={results.top_products}
                  layout="vertical"
                  margin={{ top: 20, right: 40, left: 150, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fill: "#ffffff" }} />
                  <YAxis
                    type="category"
                    dataKey="Product Name"
                    width={220}
                    tick={{ fill: "#ffffff" }}
                  />
                  <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
                  <Bar dataKey="Sales" fill="#22c55e" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top States */}
          {results.top_states && (
            <div className="chart-section">
              <h3>Top {topN} States by Sales</h3>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={results.top_states}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="State"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    tick={{ fill: "#ffffff" }}
                  />
                  <YAxis tick={{ fill: "#ffffff" }} />
                  <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
                  <Bar dataKey="Sales" fill="#a3a5ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Cities */}
          {results.top_cities && (
            <div className="chart-section">
              <h3>Top {topN} Cities by Sales</h3>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={results.top_cities}
                  margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="City"
                    type="category"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    tick={{ fill: "#ffffff" }}
                  />

                  <YAxis
                    type="number"
                    tickFormatter={(value) => `₹ ${value.toLocaleString()}`}
                    tick={{ fill: "#ffffff" }}
                  />

                  <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />

                  <Bar dataKey="Sales" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default UploadPage;