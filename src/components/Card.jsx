import Icon from "./Icon";
import React, { useRef } from "react";

const Card = ({ title, readMore, children }) => {
  const cardBody = useRef(null);

  const handleExtend = (extend) => {
    const height = extend ? 200 : cardBody.current.scrollHeight + 32;
    setCardHeight(`${height}px`);
    setExtended(!extend);
  };

  const [extended, setExtended] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(!!readMore?.length ? "200px" : "initial");

  return (
    <div className={`card ${extended ? "card--extended" : ""}`}>
      <div className="card__title">
        <h2>{title}</h2>
      </div>

      <div
        ref={cardBody}
        className="card__body"
        style={{ ["--card-body-height"]: `${cardHeight}` }}
      >
        {children}
      </div>

      {!!readMore?.length && (
        <div className="card__read-more">
          <button onClick={() => handleExtend(extended)}>
            <span>{extended ? "voir moins" : readMore}</span>
            <Icon name={extended ? "arrow-ios-upward-outline" : "arrow-ios-downward-outline"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
