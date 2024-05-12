import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/TemplateForm.css";

const IndividualTemplate = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const { templateId } = useParams(); // Extract the template ID from URL parameter

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log(templateId);
        // Fetch the template data based on the ID from the server
        const response = await axios.get(`http://localhost:8080/${templateId}`);
        const templateData = response.data;

        // Extract fields from the template schema
        const templateFields = templateData.fields;

        // Update state with the fields
        setFields(templateFields);

        // Initialize form data with empty values for each field
        const initialFormData = {};
        templateFields.forEach((field) => {
          initialFormData[field.name] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    // Fetch the template data when the component mounts
    fetchTemplate();
  }, [templateId]); // Fetch template data when templateId changes

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

export default IndividualTemplate;
