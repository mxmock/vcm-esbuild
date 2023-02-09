import React from "react";
import Icon from "./Icon";

const Feature = ({ feature }) => (
  <div className="feature__block">
    <Icon name={feature.icon.replace("vcm-", "")} />
    <p className="feature__text">
      <span>{feature.value}</span>
      <span>{feature.labelFR}</span>
    </p>
  </div>
);

export default Feature;
