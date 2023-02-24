import React from "react";

const Input = (props) => {
  const { id, value, label, type, required, pattern, onChange } = props;

  return (
    <div className={`input ${!value?.length ? "" : "filled"}`}>
      <input
        id={id}
        name={id}
        value={value}
        type={type || "text"}
        required={!!required}
        pattern={pattern || null}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        className={`${required ? "required" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
