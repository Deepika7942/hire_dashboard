import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/styles.css";

const API_BASE_URL = "https://hire-backend-swart.vercel.app/api";


const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [disabledIds, setDisabledIds] = useState(new Set());

  // Function to fetch applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`);
      setApplications(response.data);
    } catch (err) {
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications on mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (id, action) => {
    console.log(`Updating application ${id} with status: ${action}`);
  
    try {
      // Check if the application already has a status. If it does, return early to prevent duplicate updates.
      const existingApplication = applications.find((app) => app._id === id);
      if (existingApplication && existingApplication.status !== "Pending") {
        // If status is already set (Accepted, Rejected, or Deleted), do nothing.
        console.log("This application has already been processed.");
        return;
      }
  
      // Update the status on the backend
      const response = await axios.put(`${API_BASE_URL}/applications/${id}`, {
        status: action,
      });
  
      console.log("Response from backend:", response.data);
  
      if (response.status === 200) {
        // Once the status is updated, disable the action buttons for this application
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app._id === id ? { ...app, status: action, disabled: true } : app
          )
        );
  
        // Add the application to the disabledIds set to ensure buttons are disabled
        setDisabledIds((prev) => new Set(prev).add(id));
      }
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };
  
  
  
  
  // Filter applications based on the search query
  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.fullname.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query) ||
      String(app._id).toLowerCase().includes(query) ||
      app.status.toLowerCase().includes(query) ||
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
                  <th>Resume</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
  {filteredApplications.map((app, index) => (
    <tr key={app._id}>
      <td>{index + 1}</td>
      <td>{app.fullname}</td>
      <td>{app.email}</td>
      <td>{app.position}</td>
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
      <td>{app.status}</td>
      <td>
      <button
  className="accept-btn"
  onClick={() => handleAction(app._id, "Accepted")}
  disabled={app.status !== "Pending" || disabledIds.has(app._id)} // Disable if status is not Pending or action has been taken
>
  Accept
</button>

<button
  className="reject-btn"
  onClick={() => handleAction(app._id, "Rejected")}
  disabled={app.status !== "Pending" || disabledIds.has(app._id)} // Disable if status is not Pending or action has been taken
>
  Reject
</button>

<button
  className="delete-btn"
  onClick={() => handleAction(app._id, "Deleted")}
  disabled={app.status !== "Pending" || disabledIds.has(app._id)} // Disable if status is not Pending or action has been taken
>
  Delete
</button>


      </td>
    </tr>
  ))}
</tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
