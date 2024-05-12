import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TemplateForm.css";

const TemplateForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLatestTemplate = async () => {
      try {
        // Fetch the latest template from the server
        const response = await axios.get(
          "http://localhost:8080/latest-template"
        );

        const latestTemplate = JSON.parse(response.data);

        console.log(latestTemplate[0].fields);

        // Extract fields from the template schema
        const templateFields = latestTemplate[0].fields;

        console.log(templateFields);

        // Update state with the fields
        setFields(templateFields);

        // Initialize form data with empty values for each field
        const initialFormData = {};
        templateFields.forEach((field) => {
          initialFormData[field.name] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching latest template:", error);
      }
    };

    // Fetch the latest template when the component mounts
    fetchLatestTemplate();

    // Fetch the latest template every day
    const intervalId = setInterval(fetchLatestTemplate, 24 * 60 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the server
      await axios.post("http://localhost:8080/submit-form", formData);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Template Form</h2>
      <form className="template-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.name}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TemplateForm;
