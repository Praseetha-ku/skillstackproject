import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/dailylog.css";
import { useNavigate } from "react-router-dom";

export default function AddDailyLog() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    skill: "",
    date: "",
    hours: "",
    note: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` }
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await api.get("/api/goals/");
      setSkills(res.data.results || []);
    } catch (error) {
      console.log("Skill loading failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/api/goal/${form.skill}/logs/`, form);
      navigate("/skills/add/daily/list");
    } catch (error) {
      alert("Log adding failed");
    }
  };

  return (
    <div className="dailylog-container">
      <h2>Add Daily Log</h2>

      <form className="daily-form" onSubmit={handleSubmit}>
       
        <div className="input-group">
          <label>Skill</label>
          <select
            name="skill"
            value={form.skill}
            onChange={(e) => setForm({ ...form, skill: e.target.value })}
            required
          >
            <option value="">Select</option>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Hours (0.5, 1, 2...)</label>
          <input
            type="number"
            step="0.5"
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Note</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Optional note..."
          />
        </div>

        <button className="submit-btn">Add Log</button>
      </form>
    </div>
  );
}
