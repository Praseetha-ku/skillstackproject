import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";

 function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
    <div className="login-box">

      <h2 className="heading">SkillStack Login</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="label">Username</label>
        <input
          type="text"
          name="username"
          className="input"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn-login" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="small-text">2025 SkillStack</p>

    </div>
  </div>
);
}
export default Login