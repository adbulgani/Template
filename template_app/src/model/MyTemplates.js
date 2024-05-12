import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/MyTemplates.css";

const MyTemplates = () => {
  const [createdByMe, setCreatedByMe] = useState([]);
  const [assignedToMe, setAssignedToMe] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    // Fetch templates created by the logged-in user
    axios
      .get(`http://localhost:8080/my-templates/created-by/${userId}`)
      .then((response) => {
        setCreatedByMe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching templates created by me:", error);
      });

    // Fetch templates assigned to the logged-in user
    axios
      .get(`http://localhost:8080/my-templates/assigned-to/${userId}`)
      .then((response) => {
        setAssignedToMe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching templates assigned to me:", error);
      });
  }, []);

  return (
    <div className="my-templates-container">
      <div className="templates-section">
        <h2>Templates Created by Me</h2>
        <ul className="templates-list">
          {createdByMe.map((template) => (
            <li key={template._id}>
              <Link to={`/template-form/${template._id}`}>
                {template.templateName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="templates-section">
        <h2>Templates Assigned to Me</h2>
        <ul className="templates-list">
          {assignedToMe.map((template) => (
            <li key={template._id}>
              <Link to={`/template-form/${template._id}`}>
                {template.templateName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyTemplates;
