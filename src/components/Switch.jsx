import React from "react";

const Switch = (props) => {
  const { id, value, label, onChange, positiveTxt, negativeTxt } = props;

  return (
    <div className="switch">
      <label htmlFor={id}>
        <span className="switch__label">{label}</span>
        <input
          id={id}
          name={id}
          type="checkbox"
          defaultChecked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="switch__lever"></span>
      </label>
      <span className="switch__value">{value ? positiveTxt : negativeTxt}</span>
    </div>
  );
};

export default Switch;
