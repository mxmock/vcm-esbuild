import React from "react";

const useTimeout = (callback, delay) => {
  React.useEffect(() => {
    const id = setTimeout(callback, delay);
    return () => {
      clearTimeout(id);
    };
  });
};

export default useTimeout;
