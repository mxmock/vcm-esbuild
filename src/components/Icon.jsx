import React from "react";

const Icon = ({ name }) => (
  <div className="ock-icon">
    <span>
      <i className={`ock-${name}`}></i>
    </span>
  </div>
);

export default Icon;
