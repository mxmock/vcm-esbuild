import React from "react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const Portal = (props) => {
  const { element, visible } = props;
  const [isVisible, setVisible] = useState(visible);

  const hasDOM = () => !!window?.document?.createElement;
  const showOrHide = () => setVisible(hasDOM() && visible);

  // eslint-disable-next-line
  useEffect(showOrHide, [visible]);

  return <>{element && isVisible && createPortal(element, document.body)}</>;
};

export default Portal;
