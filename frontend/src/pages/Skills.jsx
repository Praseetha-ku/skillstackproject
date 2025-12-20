import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/skillTable.css";
import { useParams, useNavigate } from "react-router-dom";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [learningType, setLearningType] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` },
  });

  useEffect(() => {
    loadSkills("/api/goals/");
  }, [search, learningType, status, order]);

  const loadSkills = async (url = "/api/goals/") => {
    try {
        const params = {};

    if (search) params.search = search;
    if (learningType) params.learning_type = learningType;
    if (status) params.status = status;
    if (order) params.ordering = order;
    const res = await api.get(url, { params });

      if (res.data.results) {
        setSkills(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      } else {
        setSkills(res.data);
      }
    } catch (err) {
      console.log("Load Error:", err);
    }
  };

  const updateSkill = async (id, data) => {
    try {
      await api.patch(`/api/goals/${id}/`, data);
      loadSkills("/api/goals/");
    } catch (err) {
      console.log("Update Error:", err.response?.data || err);
    }
  };

  const deleteSkill = async (id) => {
    if (!confirm("Do you want to delete this skill?")) return;
    try {
      await api.delete(`/api/goals/${id}/`);
      loadSkills("/api/goals/");
    } catch (err) {
      console.log("Delete Error:", err.response?.data || err);
    }
  };

  return (
    <div className="skills-container">
      <h2 className="page-title">Your Skills</h2>

      <div className="table-wrapper">
        <div className="filters">

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search by name..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      loadSkills();
    }}
  />

  {/* LEARNING TYPE FILTER */}
  <select
    value={learningType}
    onChange={(e) => {
      setLearningType(e.target.value);
      loadSkills();
    }}
  >
    <option value="">All Learning Types</option>
    <option value="course">Course</option>
    <option value="tutorial">Tutorial</option>
    <option value="certification">Certification</option>
  </select>

  {/* STATUS FILTER */}
  <select
    value={status}
    onChange={(e) => {
      setStatus(e.target.value);
      loadSkills();
    }}
  >
    <option value="">All Status</option>
    <option value="started">Started</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>

  {/* SORT ORDER */}
  <select
    value={order}
    onChange={(e) => {
      setOrder(e.target.value);
      loadSkills();
    }}
  >
    <option value="">Sort By</option>
    <option value="created_at">Created (Oldest First)</option>
    <option value="-created_at">Created (Newest First)</option>
    <option value="updated_at">Updated (Oldest First)</option>
    <option value="-updated_at">Updated (Newest First)</option>
    <option value="difficulty">Difficulty (Low → High)</option>
    <option value="-difficulty">Difficulty (High → Low)</option>
  </select>

</div>

        <table className="skills-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Difficulty</th>
              <th>Total Hours</th>
              <th>Note</th>
              <th>Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.map((skill) => {
              const isCompleted = skill.status === "completed";
              const isCertification =
                skill.learning_type === "certification" && isCompleted;

              return (
                <tr key={skill.id}>
                  <td>{skill.name}</td>

                  {/* STATUS */}
                  <td>
                    <select
                      value={skill.status}
                      onChange={(e) =>
                        updateSkill(skill.id, { status: e.target.value })
                      }
                    >
                      <option value="started">Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  {/* DIFFICULTY */}
                  <td>
                    <select
                      value={skill.difficulty || ""}
                      disabled={!isCompleted}
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          difficulty: e.target.value || null,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="1">Easy</option>
                      <option value="2">Medium</option>
                      <option value="3">Hard</option>
                    </select>
                  </td>

                  {/* HOURS */}
                  <td>{skill.total_hours}</td>

                  {/* NOTE */}
                  <td>
                    <textarea
                      disabled={!isCompleted}
                      value={skill.main_point || ""}
                      placeholder={
                        isCompleted
                          ? "Add note..."
                          : "Complete to enable notes"
                      }
                      onChange={(e) =>
                        updateSkill(skill.id, { main_point: e.target.value })
                      }
                    />
                  </td>

                  {/* CERTIFICATE */}
                  <td>
                    <input
                      type="text"
                      disabled={!isCertification}
                      value={skill.certificate_url || ""}
                      placeholder={
                        isCertification
                          ? "Paste certificate URL"
                          : "Enabled only for certification"
                      }
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          certificate_url: e.target.value,
                        })
                      }
                    />
                  </td>

                  {/* ACTIONS */}
                  <td className="action-buttons">
                    <button
                      className="delete-btn"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      Delete
                    </button>
                    <button onClick={() => navigate(`/skill/${skill.id}`)}>
  View
</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        

      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={!prevPage}
          onClick={() => loadSkills(prevPage.replace("http://127.0.0.1:8000", ""))}
        >
          Previous
        </button>

        <button
          disabled={!nextPage}
          onClick={() => loadSkills(nextPage.replace("http://127.0.0.1:8000", ""))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SkillList;
