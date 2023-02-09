import React from "react";

const useInterval = (callback, delay, changeEvent) => {
  let intervalId = null;

  const startInterval = () => {
    intervalId = setInterval(callback, delay);
  };

  const clear = () => {
    clearInterval(intervalId);
  };

  React.useEffect(() => {
    startInterval();
    return () => {
      clear();
    };
  }, [changeEvent]);

  return [clear, startInterval, intervalId];
};

export default useInterval;
