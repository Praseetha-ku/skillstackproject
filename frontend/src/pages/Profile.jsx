import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/profile.css";

 function Profile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` }
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/profile/");
      setProfile(res.data);
    } catch (err) {
      console.log("Profile Load Error:", err);
    }
  };

  if (!profile) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>

        <div className="profile-row">
          <span className="label">Username:</span>
          <span className="value">{profile.username}</span>
        </div>

        <div className="profile-row">
          <span className="label">Joined On:</span>
          <span className="value">{profile.joined_on}</span>
        </div>

        <div className="profile-row">
          <span className="label">Total Skills:</span>
          <span className="value">{profile.total_skills}</span>
        </div>

        <div className="profile-row">
          <span className="label">Completed Skills:</span>
          <span className="value">{profile.completed_skills}</span>
        </div>

        <div className="profile-row">
          <span className="label">Total Hours Learned:</span>
          <span className="value">{profile.total_hours}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile