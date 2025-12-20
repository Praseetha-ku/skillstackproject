import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/skillDetail.css";

export default function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [skill, setSkill] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [aiResult, setAiResult] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);


  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` },
  });

  useEffect(() => {
    api.get(`/api/goals/${id}/`)
      .then((res) => setSkill(res.data))
      .catch((err) => console.error("Load Error:", err));
  }, [id]);

// recommended resousrces
  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/ai/${id}/recommend/`);
      setAiResult({ title: "Recommended Resources", content: res.data.recommendations });
    } catch (err) { 
      alert("Error fetching resources"); 
    } finally { 
      setLoading(false); 
    }
  };

//   timline prediction
  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/ai/${id}/predict/`);
      setAiResult({ 
        title: "Timeline Prediction", 
        content: `Predicted Completion Date: ${res.data.predicted_completion_date}` 
      });
    } catch (err) { 
      alert("Log more hours first to get a prediction!"); 
    } finally { 
      setLoading(false); 
    }
  };

//   note sumamriazation
  const handleSummarize = async () => {
    if (!noteText.trim()) return alert("Please enter notes first");
    setLoading(true);
    try {
      const res = await api.post(`/api/ai/${id}/summary/`, { text: noteText });
      setAiResult({ title: "Summary", content: res.data.summary });
    } catch (err) { 
      alert("Summary failed"); 
    } finally { 
      setLoading(false); 
    }
  };

  if (!skill) return <div className="loader">Loading Skill Details...</div>;

  return (
    <div className="skill-page">
   
      <header className="skill-header">
        <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="title-area">
          <h1>{skill.name}</h1>
          <span className="badge status">{skill.status}</span>
        </div>
      </header>

      <div className="skill-grid">
        
     {/* ai tools here */}
        <aside className="skill-sidebar">
          <div className="card">
            <h3>AI Learning Toolkit</h3>
            <div className="btn-group">
              <button onClick={handleRecommend} className="btn-primary" disabled={loading}>
                Suggest Resources
              </button>
              <button onClick={handlePredict} className="btn-primary" disabled={loading}>
                Predict Timeline
              </button>
            </div>

            <div className="summary-section">
              <textarea 
                placeholder="Paste your study notes here..." 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button onClick={handleSummarize} className="btn-dark" disabled={loading}>
                Summarize Notes
              </button>
            </div>
          </div>
        </aside>

    {/* ai results here */}
        <main className="skill-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Gemini AI is processing...</p>
            </div>
          ) : aiResult.content ? (
            <div className="result-box fade-in">
              <h2>{aiResult.title}</h2>
              <div className="result-text">{aiResult.content}</div>
              <button className="btn-clear" onClick={() => setAiResult({title:"", content:""})}>
                Clear Results
              </button>
            </div>
          ) : (
            <div className="placeholder-text">
              <p>Select an AI tool from the sidebar to generate learning insights.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}