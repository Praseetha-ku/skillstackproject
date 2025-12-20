import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/addskill.css";
function AddSkill() {
  const [categories, setCategories] = useState([]); // **array**
  const [form, setForm] = useState({
    name: "",
    category: "",
    platform: "",
    resource_type: "",
    learning_type: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories/", {
        headers: { Authorization: `Token ${token}` },
      });

      // ❗ TAKE ONLY THE ARRAY PART
      setCategories(res.data.results || []);
    } catch (err) {
      console.log("CATEGORY ERROR", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:8000/api/goals/", form, {
      headers: { Authorization: `Token ${token}` },
    });

    alert("Skill added!");
  };

  return (
    <div className="addskill-container">
      <h2>Add New Skill</h2>

      <form onSubmit={handleSubmit} className="skill-form">
        
        <label>Name</label>
        <input name="name" onChange={handleChange} required />

        <label>Category</label>
        <select name="category" onChange={handleChange} required>
          <option value="">Select</option>

          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}

        </select>

        <label>Platform</label>
        <select name="platform" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="udemy">Udemy</option>
          <option value="youtube">YouTube</option>
          <option value="coursera">Coursera</option>
          <option value="other">Other</option>
        </select>

        <label>Resource Type</label>
        <select name="resource_type" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="video">Video</option>
          <option value="course">Course</option>
          <option value="article">Article</option>
          <option value="exam">Exam</option>
        </select>

        <label>Learning Type</label>
        <select name="learning_type" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="course">Course</option>
          <option value="tutorial">Tutorial</option>
          <option value="certification">Certification</option>
        </select>

        <button>Add Skill</button>
      </form>
    </div>
  );
}

export default AddSkill;
