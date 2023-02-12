import React from "react";
import Icon from "./Icon";

const NumberInput = (props) => {
  const { id, value, step, min, max, label, required, onChange } = props;

  const handleChange = (val) => {
    if (val < min || val > max) return;
    onChange(`${val}`);
  };

  return (
    <div className={`input ${!value?.length ? "" : "filled"}`}>
      <button
        type="button"
        disabled={value === min}
        className={`counter__minus`}
        onClick={() => handleChange(parseFloat(value) - 1)}
      >
        <Icon name="minus-outline" />
      </button>
      <input
        id={id}
        name={id}
        type="number"
        value={value}
        tabIndex={-1}
        readOnly={true}
        min={min || "0"}
        max={min || "100"}
        className="counter"
        step={step || "any"}
        required={!!required}
      />
      <label htmlFor={id}>{label}</label>
      <button
        type="button"
        disabled={value === max}
        className={`counter__plus`}
        onClick={() => handleChange(parseFloat(value) + 1)}
      >
        <Icon name="plus-outline" />
      </button>
    </div>
  );
};

export default NumberInput;
