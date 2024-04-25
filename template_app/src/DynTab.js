import "./css/DynTab.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import TemplateForm from "./model/UserList";

const DynamicTable = () => {
  const [fields, setFields] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [showFieldForm, setShowFieldForm] = useState(false);
  const [showRowForm, setShowRowForm] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const [aggField, setAggField] = useState(false);
  const [aggFunc, setAggFunc] = useState("");
  const [newRowData, setNewRowData] = useState({});
  const formOverlayRef = useRef(null);

  const addField = () => {
    setShowFieldForm(true);
  };

  const addRow = () => {
    setShowRowForm(true);
  };

  const handleFieldSubmit = (e) => {
    e.preventDefault();
    if (!newFieldName.trim()) {
      alert("Please enter field name.");
      return;
    }
    if (!newFieldType.trim()) {
      alert("Please select field type.");
      return;
    }
    if (!aggFunc.trim()) {
      alert("Please select Agg Func Type.");
      return;
    }
    setFields([...fields, { name: newFieldName, type: newFieldType }]);
    setNewFieldName("");
    setNewFieldType("");
    setShowFieldForm(false);
  };

  const handleRowSubmit = (e) => {
    e.preventDefault();
    if (fields.length === 0) {
      alert("Please add fields first.");
      return;
    }
    const newRow = {};
    fields.forEach((field) => {
      newRow[field.name] = newRowData[field.name] || "";
    });
    setRowData([...rowData, newRow]);
    setNewRowData({});
    setShowRowForm(false);
  };

  const handleFieldInputChange = (e) => {
    setNewFieldName(e.target.value);
  };

  const handleFieldTypeChange = (e) => {
    setNewFieldType(e.target.value);
    if (e.target.value == "number") {
      setAggField(true);
    } else {
      setAggField(false);
    }
  };

  const handleAggField = (e) => {
    setAggFunc(e.target.value);
  };

  const handleRowInputChange = (e) => {
    setNewRowData({
      ...newRowData,
      [e.target.name]: e.target.value,
    });
  };

  const closeOverlay = () => {
    setShowFieldForm(false);
    setShowRowForm(false);
  };

  const handleSubmitFields = () => {
    // Make an HTTP POST request to your Express server
    axios
      .post("http://localhost:8080/create", fields)
      .then((response) => {
        console.log("Fields submitted successfully:", response.data);
        // Handle success, if needed
      })
      .catch((error) => {
        console.error("Error submitting fields:", error);
        // Handle error, if needed
      });
  };
  return (
    <>
      <div className="table-container">
        <div>
          <h2>Create Template</h2>
          <button onClick={addField}>Add Field</button>
          <button onClick={addRow}>Add Row</button>
        </div>
        {/* Field Form Overlay */}
        {showFieldForm && (
          <div className="form-overlay" onClick={closeOverlay}>
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleFieldSubmit}
            >
              <input
                type="text"
                placeholder="Enter field name"
                value={newFieldName}
                onChange={handleFieldInputChange}
              />
              <select value={newFieldType} onChange={handleFieldTypeChange}>
                <option value="">Select field type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                {/* Add more options as needed */}
              </select>
              {aggField && (
                <select value={aggFunc} onChange={handleAggField}>
                  <option value="">Select field type</option>
                  <option value="sum">Sum</option>
                  <option value="avg">Average</option>
                  <option value="both">Sum&Average</option>
                </select>
              )}
              <button type="submit">Add Field</button>
            </form>
          </div>
        )}

        {/* Row Form Overlay */}
        {showRowForm && (
          <div className="form-overlay" onClick={closeOverlay}>
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleRowSubmit}
            >
              {fields.map((field) => (
                <div key={field.name}>
                  <label>{field.name}:</label>
                  <input
                    type="text"
                    name={field.name}
                    value={newRowData[field.name] || ""}
                    onChange={handleRowInputChange}
                  />
                </div>
              ))}
              <button type="submit">Add Row</button>
            </form>
          </div>
        )}

        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field.name}>{row[field.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSubmitFields}>Submit Template</button>

        {/* Display fields */}
        <div>
          <h3>Fields:</h3>
          <ul>
            {fields.map((field, index) => (
              <li key={index}>
                {field.name} - {field.type}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TemplateForm></TemplateForm>
    </>
  );
};

export default DynamicTable;
