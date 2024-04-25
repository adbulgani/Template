import React from "react";
import "../css/Cell.css";

function Cell({ children }) {
  return (
    <div className="outer">
      <td>{children}</td>
    </div>
  );
}

export default Cell;
