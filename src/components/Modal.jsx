import React from "react";
import Portal from "./Portal";
import FocusTrapper from "./FocusTrapper";
import { useKeyPress } from "../hooks/keypress.hook";

const Modal = (props) => {
  const { children, position, fullscreen, onClose } = props;

  const [modalPosition, setModalPosition] = React.useState({ x: `50%`, y: `50%` });

  useKeyPress("Escape", onClose);

  React.useEffect(() => {
    if (!children || !position) return;
    const y = `calc(${position.y}px - var(--modal-padding))`;
    const x = `calc(50% + ${position.x}px - var(--100vw) / 2)`;
    setModalPosition({ x, y });
  }, [children, position]);

  const modalHtml = (
    <div className={`modal ${fullscreen ? "modal--fullscreen" : ""}`}>
      <FocusTrapper>
        <div
          role="dialog"
          aria-modal={true}
          className="modal__card"
          style={{
            ["--top-origin"]: `${modalPosition.y}`,
            ["--left-origin"]: `${modalPosition.x}`,
          }}
        >
          {children}
        </div>
      </FocusTrapper>
    </div>
  );

  return (
    <Portal
      visible={true}
      element={modalHtml}
    />
  );
};

export default Modal;
