import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    name: "",
    designation: "",
    BA: "",
    HRMS: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform client-side validation
    const validationErrors = {};
    if (!formData.email || !formData.email.includes("@")) {
      validationErrors.email = "Invalid email";
    }
    if (!formData.contact || formData.contact.length !== 10) {
      validationErrors.contact = "Contact must be 10 digits";
    }
    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Send POST request to server
    axios
      .post("http://localhost:8080/register", formData)
      .then((response) => {
        setSuccessMessage("Registration successful");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Handle registration error
      });
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && (
            <span className="error-message">{errors.contact}</span>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="">Select designation</option>
            <option value="SDE">SDE</option>
            <option value="AGM">AGM</option>
            <option value="DE">DE</option>
            <option value="JTO">JTO</option>
            <option value="JE">JE</option>
          </select>
        </div>
        <div>
          <label>BA:</label>
          <select name="BA" value={formData.BA} onChange={handleChange}>
            <option value="">Select BA</option>
            <option value="ATP">ATP</option>
            <option value="CDP">CDP</option>
            <option value="CTR">CTR</option>
            <option value="EG">EG</option>
            <option value="GTR">GTR</option>
            <option value="KNL">KNL</option>
            <option value="KRI">KRI</option>
            <option value="NLR">NLR</option>
            <option value="PKM">PKM</option>
            <option value="SKM">SKM</option>
            <option value="VM">VM</option>
            <option value="VZM">VZM</option>
            <option value="WG">WG</option>
          </select>
        </div>
        <div>
          <label>HRMS:</label>
          <input
            type="text"
            name="HRMS"
            value={formData.HRMS}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login here</Link>
      </p>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
