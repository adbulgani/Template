import React, { useState, useEffect } from "react";
import axios from "axios";

const TemplateForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch list of users from the server
    axios
      .get("http://localhost:8080/Users")
      .then((response) => {
        // Update the state with the list of users
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleChange = (e) => {
    // Update the selected users when the dropdown selection changes
    setSelectedUsers(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  return (
    <div>
      <label htmlFor="assignTo">Assign To:</label>
      <select
        id="assignTo"
        multiple
        value={selectedUsers}
        onChange={handleChange}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateForm;
