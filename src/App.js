
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AcceptedApplications from "./components/acceptedApplications";
import RejectedApplications from "./components/rejected";
import DeletedApplications from "./components/Deleted";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accepted" element={<AcceptedApplications />} />
      <Route path="/rejected" element={<RejectedApplications />} />
      <Route path="/deleted" element={<DeletedApplications />} />
    </Routes>
  );
};

export default App;

