import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/dailyloglist.css";

export default function DailyLogList() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` },
  });

  useEffect(() => {
    loadLogs();
  }, [page]);

  const loadLogs = async () => {
    try {
      const res = await api.get(`/api/logs/?page=${page}`);
      setLogs(res.data.results || []);
    } catch (error) {
      console.log("Log load error", error);
    }
  };

  const deleteLog = async (id) => {
    if (!confirm("Delete log?")) return;
    await api.delete(`/api/logs/${id}/`);
    loadLogs();
  };

  const updateLog = async (id, data) => {
    try {
      await api.patch(`/api/logs/${id}/`, data);
      loadLogs();
    } catch (err) {
      console.log("Update error:", err.response?.data || err);
    }
  };

  return (
    <div className="loglist-container">
      <h2>Daily Logs</h2>

      <table className="log-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.skill_name}</td>

              <td>{log.date}</td>

              {/* HOURS EDIT FIELD */}
              <td>
                <input
                  type="number"
                  step="0.5"
                  value={log.hours}
                  onChange={(e) =>
                    updateLog(log.id, { hours: e.target.value })
                  }
                />
              </td>

              {/* NOTE EDIT FIELD */}
              <td>
                <textarea
                  value={log.note || ""}
                  onChange={(e) =>
                    updateLog(log.id, { note: e.target.value })
                  }
                ></textarea>
              </td>

              {/* DELETE */}
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteLog(log.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
