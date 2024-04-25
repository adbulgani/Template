import "./App.css";
import DynamicTable from "./DynTab.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateManager from "./model/TemplateManager.js";
import RegistrationForm from "./model/Register.js";
import LoginForm from "./model/Login.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<TemplateManager />} />
          <Route path="/create-template" element={<DynamicTable />} />
          {/* Add route for viewing templates */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
