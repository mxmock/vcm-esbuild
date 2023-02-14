import React from "react";
import Icon from "./Icon";

const DateInput = (props) => {
  const { id, value, min, max, label, required, onChange } = props;

  return (
    <div className={`input ${!value?.length ? "" : "filled"}`}>
      <input
        id={id}
        name={id}
        type="date"
        value={value}
        min={min || null}
        max={max || null}
        required={!!required}
        onChange={(e) => onChange(e.target.value)}
      />
      <label className={`${required ? "required" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div className="calendar-icon">
        <Icon name="calendar-outline" />
      </div>
    </div>
  );
};

export default DateInput;
