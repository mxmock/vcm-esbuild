import React from "react";
import Icon from "./Icon";

const Radio = (props) => {
  const { checked, choices, name, hideLabel, onChange } = props;

  return (
    <ul className={`input radio`}>
      {choices.map((c) => (
        <li
          key={c.id}
          className={`${checked === c.id ? "radio--checked" : ""}`}
        >
          <input
            id={c.id}
            name={name}
            type="radio"
            onChange={() => onChange(c.id)}
            defaultChecked={checked === c.id}
          />
          <label
            htmlFor={c.id}
            className={`${hideLabel ? "radio__label--hidden" : ""}`}
          >
            {c.label || ""}
          </label>
          {c.icon && (
            <div
              className="radio__icon"
              style={{ [`--icon-color`]: `${c.icon.color}` }}
            >
              <Icon name={c.icon.name} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Radio;
