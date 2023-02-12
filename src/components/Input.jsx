import React from "react";

const Input = (props) => {
  const { id, value, label, type, required, onChange } = props;

  return (
    <div className={`input ${!value?.length ? "" : "filled"}`}>
      <input
        id={id}
        name={id}
        value={value}
        type={type || "text"}
        required={!!required}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
