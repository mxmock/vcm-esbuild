import React from "react";
import Icon from "./Icon";

const DateInput = (props) => {
  const { id, value, label, required, onChange } = props;

  return (
    <div className={`input ${!value?.length ? "" : "filled"}`}>
      <input
        id={id}
        name={id}
        type="date"
        value={value}
        required={!!required}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
      <div className="calendar-icon">
        <Icon name="calendar-outline" />
      </div>
    </div>
  );
};

export default DateInput;
