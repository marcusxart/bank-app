import React from "react";
import classNames from "classnames";

const Button = ({ text = "text", type = "primary", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "h-[48px] px-[36px]  rounded  font-open-sans font-bold capitalize text-white min-w-[170px]",
        {
          "bg-primary": type === "primary",
          "bg-secondary": type !== "primary",
        }
      )}
    >
      {text}
    </button>
  );
};

export default Button;
