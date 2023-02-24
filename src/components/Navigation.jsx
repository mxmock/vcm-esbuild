import React from "react";
import getNavigation from "../constants/navigation.const";

const Navigation = ({ path }) => (
  <ul className="navigation">
    {getNavigation(path).map((nav, i) => (
      <li key={i}>
        <a
          title={nav.desc}
          className="navigation__link"
          href={nav.link}
        >
          {nav.label}
        </a>
      </li>
    ))}
  </ul>
);

export default Navigation;
