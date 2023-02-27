import React from "react";
import { useRef } from "react";
import { useKeyPress } from "../hooks/keypress.hook";

const FocusTrapper = (props) => {
  const { children } = props;
  const lastFocus = useRef(null);
  const firstFocus = useRef(null);

  const handleTabKey = (e) => {
    const shiftActive = e.shiftKey;
    const isLastFocus = document.activeElement === lastFocus.current;
    const isFirstFocus = document.activeElement === firstFocus.current;

    if (!shiftActive && isLastFocus) {
      firstFocus.current.focus();
      return e.preventDefault();
    }

    if (shiftActive && isFirstFocus) {
      lastFocus.current.focus();
      e.preventDefault();
    }
  };

  useKeyPress("Tab", handleTabKey);

  return (
    <>
      <button
        autoFocus
        tabIndex={0}
        ref={firstFocus}
        className="hide"
      ></button>
      {children}
      <button
        tabIndex={0}
        ref={lastFocus}
        className="hide"
      ></button>
    </>
  );
};

export default FocusTrapper;
