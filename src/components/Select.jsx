import React from "react";
import Icon from "./Icon";

const Select = (props) => {
  const { id, value, defaultValue, label, options, onChange } = props;

  return (
    <div className={`input filled select`}>
      <select
        id={id}
        name={id}
        onChange={(e) => onChange(e.target.value)}
        value={defaultValue || value || options[0].value}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      <div className="select__icon">
        <Icon name="arrow-down-outline" />
      </div>
    </div>
  );
};

export default Select;
