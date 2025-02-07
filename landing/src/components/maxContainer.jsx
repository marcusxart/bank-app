import React from "react";

const MaxContainer = ({ children }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 h-fit">{children}</div>
  );
};

export default MaxContainer;
