import React from "react";

const Textarea = (props) => {
  const { id, label, required, value, onChange } = props;

  const handleChange = (target) => {
    const value = target.value;
    target.parentNode.dataset.replicatedValue = value;
    onChange(value);
  };

  return (
    <div className={`textarea ${!value?.length ? "" : "filled"}`}>
      <textarea
        id={id}
        name={id}
        wrap="hard"
        spellCheck={false}
        required={!!required}
        onChange={(e) => handleChange(e.target)}
      ></textarea>
      <label className="textarea__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Textarea;
