import classNames from "classnames";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import OutsideAlerter from "./outsideEventChecker";

const Dropdown = ({
  options = [],
  onChange,
  value,
  full,
  label,
  placeholder = "Select",
  disabled,
}) => {
  const [toggle, setToggle] = useState(false);

  const fndeValue = options?.find((v) => v?.value === value);

  const handleToggleOff = () => {
    setToggle(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setToggle(!toggle);
    }
  };
  return (
    <OutsideAlerter handleClick={handleToggleOff}>
      <div
        className={classNames("relative", {
          "w-[160px]": !full,
          "w-full": full,
          "opacity-60  cursor-not-allowed": disabled,
        })}
      >
        <div>
          {" "}
          {label && (
            <p className="text-[14px] text-dark-text  font-medium mb-1  capitalize">
              {label}
            </p>
          )}
          <button
            onClick={handleToggle}
            type="button"
            className={classNames(
              "h-[50px] w-full  px-[16px] flex items-center justify-between  text-[14px]  border-solid border-[1.6px]",
              {
                "text-gray-400": !fndeValue?.label,
                "border-gray-300": !toggle,
                "border-secondary": toggle,
                "bg-gray-100 cursor-not-allowed": disabled,
                "bg-white": !disabled,
              }
            )}
          >
            {fndeValue?.label ?? placeholder}
            <IoIosArrowDown />
          </button>
        </div>
        {toggle && options?.length > 0 && !disabled && (
          <ul className="bg-white absolute left-0 right-0 top-[78px] shadow-sm z-[4] text-[14px] p-[4px] border-gray-300 border-solid border-[1.6px] max-h-[150px] overflow-y-auto">
            {options?.map((i, key) => (
              <li
                key={key}
                className="min- h-[34px] flex items-center w-full px-[10px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition duration-300"
                onClick={() => {
                  if (!disabled) {
                    onChange && onChange(i?.value);
                  }
                }}
              >
                {i?.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </OutsideAlerter>
  );
};

export default Dropdown;
