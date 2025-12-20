import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
        headers: { Authorization: `Token ${token}` },
      });
      setData(response.data);
    } catch (err) {
      console.log("Error...........", err);
    }
  };

  if (!data) return <p className="loading">Loading dashboard...</p>;
 

  return (
    <div className="dashboard-container">
      <h2 className="dash-title">Dashboard Overview</h2>

      <div className="dash-grid">

        <div className="dash-card">
          <h3>Total Skills</h3>
          <p>{data.total_skills}</p>
        </div>

        <div className="dash-card">
          <h3>Completed</h3>
          <p>{data.completed_skills}</p>
        </div>

        <div className="dash-card">
          <h3>In Progress</h3>
          <p>{data.in_progress_skills}</p>
        </div>

        <div className="dash-card">
          <h3>Started</h3>
          <p>{data.started_skills}</p>
        </div>

        <div className="dash-card">
          <h3>Total Hours</h3>
          <p>{data.total_hours}</p>
        </div>

        <div className="dash-card">
          <h3>Total Logs</h3>
          <p>{data.total_logs}</p>
        </div>
      </div>

      <h3 className="section-title">Category Breakdown</h3>
      <ul className="breakdown-list">
        {data.category_breakdown.map((item, i) => (
          <li key={i}>
            {item["category__name"] ?? "Uncategorized"} — {item.total}
          </li>
        ))}
      </ul>

      <h3 className="section-title">Learning Type Breakdown</h3>
      <ul className="breakdown-list">
        {data.learning_type_breakdown.map((item, i) => (
          <li key={i}>
            {item.learning_type} — {item.total}
          </li>
        ))}
      </ul>
      

      <h3 className="section-title">Recently Completed</h3>
      <ul className="breakdown-list">
        {data.recent_completed.map((item, i) => (
          <li key={i}>
            {item.name} — {item.completed_on ?? "No Date"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

