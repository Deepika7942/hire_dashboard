import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/styles.css";

const API_BASE_URL = "https://hire-backend-swart.vercel.app/api";


const RejectedApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRejectedApplications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/applications?status=Rejected`);
        setApplications(response.data);
      } catch (err) {
        setError("Failed to fetch rejected applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchRejectedApplications();
  }, []);

  // Filter applications based on search query
  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.fullname.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query) ||
      String(app._id).toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="application-list">
          {loading ? (
            <p>Loading applications...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No rejected applications found.</td>
                  </tr>
                ) : (
                  filteredApplications.map((app, index) => (
                    <tr key={app._id}>
                      <td>{index + 1}</td>
                      <td>{app.fullname}</td>
                      <td>{app.email}</td>
                      <td>{app.position}</td>
                      <td>{app.status}</td> {/* Show status */}
                      <td>
                      <a
  href={`${API_BASE_URL}/download-resume/${app.resume}`}
  target="_blank"
  rel="noopener noreferrer"
  className="download-btn"
>
  Download
</a>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectedApplications;
