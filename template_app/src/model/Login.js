import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.email || !formData.email.includes("@")) {
      validationErrors.email = "Invalid email";
    }
    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Client-side Axios request
    axios
      .get("http://localhost:8080/login", {
        params: {
          email: formData.email,
          password: formData.password,
        },
      })
      .then((response) => {
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData)); // Stringify userData before storing
        /* setSuccessMessage("Login successful"); */
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrors({ general: "Invalid email or password" });
      });
  };

  return (
    <div className="registration-form-container">
      <h2>Login Form</h2>
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
        <button type="submit">Login</button>
      </form>
      {errors.general && <p className="error-message">{errors.general}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default LoginForm;
