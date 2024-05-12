import "./App.css";
import DynamicTable from "./DynTab.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateManager from "./model/TemplateManager.js";
import RegistrationForm from "./model/Register.js";
import LoginForm from "./model/Login.js";
import MyTemplates from "./model/MyTemplates.js";
import IndividualTemplate from "./model/IndividualTemplate.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/home" element={<TemplateManager />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<TemplateManager />} />
          <Route path="/create-template" element={<DynamicTable />} />
          <Route path="/view-templates" element={<MyTemplates />} />
          <Route path="/get-templates" element={<MyTemplates />} />
          <Route
            path="/template-form/:templateId"
            element={<IndividualTemplate />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
