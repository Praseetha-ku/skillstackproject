import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/skillTable.css";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Token ${token}` },
  });

  useEffect(() => {
    loadSkills("/api/goals/");
  }, []);

  const loadSkills = async (url) => {
    try {
      const res = await api.get(url);

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
