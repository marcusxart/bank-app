import React, { useState, useEffect } from "react";

const useScrollTracker = () => {
  const [scroll, setScroll] = useState({
    y: 0,
    x: 0,
  });

  const handleScroll = () => {
    setScroll({
      y: window.scrollY,
      x: window.scrollX,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
};

export default useScrollTracker;
