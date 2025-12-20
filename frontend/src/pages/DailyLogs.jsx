import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/dailylog.css";
import { useNavigate } from "react-router-dom";

function AddDailyLog() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    skill: "",
    date: "",
    hours: "",
    note: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` },
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await api.get("/api/goals/");
      setSkills(res.data.results || []);
    } catch (err) {
      console.log("Skill Load Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/goal/${form.skill}/logs/`, form);
      alert("Daily Log Added Successfully!");
      navigate("/logs");
    } catch (err) {
      console.log("Add Log Error:", err.response?.data || err);
      alert("Error adding log");
    }
  };

  return (
    <div className="dailylog-container">
      <h2>Add Daily Log</h2>

      <form onSubmit={handleSubmit} className="log-form">
        <label>Select Skill</label>
        <select
          name="skill"
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
          required
        >
          <option value="">Choose Skill</option>
          {skills.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <label>Hours</label>
        <input
          type="number"
          step="0.5"
          name="hours"
          value={form.hours}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
          required
        />

        <label>Note</label>
        <textarea
          name="note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />

        <button type="submit">Add Log</button>
      </form>
    </div>
  );
}

export default AddDailyLog;
