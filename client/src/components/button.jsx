import classNames from "classnames";

const Button = ({ text = "text", type = "primary", onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "h-[48px] px-[36px]  rounded  font-open-sans font-bold capitalize text-white w-full ",
        {
          "bg-primary": type === "primary",
          "bg-secondary": type !== "primary",
          "opacity-60  cursor-not-allowed": disabled,
        }
      )}
    >
      {text}
    </button>
  );
};

export default Button;
