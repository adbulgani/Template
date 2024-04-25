import React from "react";
import { Link } from "react-router-dom";

const TemplateManager = () => {
  return (
    <div>
      <h2>Template Manager</h2>
      <Link to="/create-template">
        <button>Create Template</button>
      </Link>
      <Link to="/view-templates">
        <button>View Templates</button>
      </Link>
    </div>
  );
};

export default TemplateManager;
