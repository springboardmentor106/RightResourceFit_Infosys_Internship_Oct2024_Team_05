import React, { useState, useEffect } from "react";
import "./AllApplications.css";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import Sidebar from "../Dashboard/Components/Sidebar"
function AllApplications() {
  const applicants = [
    { id: 1, name: "John", status: "Applied", date: "11/22/2024", role: "Backend Developer" },
    { id: 2, name: "Karthika", status: "Accepted", date: "10/15/2024", role: "Graphic Designer" },
    { id: 3, name: "Sophia Martinez", status: "Rejected", date: "9/20/2024", role: "Machine Learning Engineer" },
    { id: 4, name: "James Anderson", status: "Review", date: "8/10/2024", role: "Full Stack Developer" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterStatus]);

  const handleSearchAndFilter = () => {
    const filtered = applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus ? applicant.status === filterStatus : true;
      return matchesSearch && matchesFilter;
    });
    setFilteredApplicants(filtered);
  };

  return (
    <>
    <Sidebar/>
    <div className="all-applications-container">
      <div className="all-applications-header">
        <h2 className="all-applications-title">All Applicants</h2>
        <div className="filter-search">
          <input
            type="text"
            placeholder="Search Applicants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-field"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Review">Review</option>
          </select>
        </div>
      </div>

      <table className="all-applications-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Applied Date</th>
            <th>Job Role</th>
            <th>Status</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, index) => (
            <tr key={applicant.id}>
              <td>{index + 1}</td>
              <td>{applicant.name}</td>
              <td>{applicant.date}</td>
              <td>{applicant.role}</td>
              <td className={`status ${applicant.status.toLowerCase()}`}>{applicant.status}</td>
              <td>
                <button className="view-button">
                  <FaEye /> View
                </button>
              </td>
              <td>
                <button className="delete-button">
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default AllApplications;
