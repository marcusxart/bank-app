import { useState } from "react";
import classNames from "classnames";
import { FaEye } from "react-icons/fa";

/**
 *
 * @param {object} props
 * @param {boolean} props.required
 * @param {string} props.placeholder
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {string} props.label
 * @param {'text' | 'email' | 'textarea' | 'password' | 'number'} props.type
 * @returns
 */
const TextField = ({
  required,
  placeholder = "Enter text",
  type = "text",
  value,
  onChange,
  label,
  max,
}) => {
  const [toggle, setToggle] = useState("password");
  const cn = classNames(
    "w-full border-[1.6px] border-solid border-gray-300  py-[10px] leading-[28px] text-[14px] transition-all duration-300 hover:border-secondary  outline-none",
    {
      "h-[50px]": type !== "textarea",
      "h-[100px] resize-none": type === "textarea",
      "px-[20px]": type !== "password",
      "pl-[20px] pr-[50px]": type === "password",
    }
  );

  const handleToggle = () => {
    if (toggle === "password") setToggle("text");
    else setToggle("password");
  };
  return (
    <label className="w-full relative font-open-sans block">
      {label && (
        <p className="text-[14px] text-dark-text  font-medium mb-1  capitalize">
          {label}
        </p>
      )}
      {type === "textarea" ? (
        <textarea
          className={cn}
          required={required}
          placeholder={placeholder + (required ? " *" : "")}
          value={value}
          onChange={onChange}
          maxLength={max}
        />
      ) : type === "password" ? (
        <input
          required={required}
          placeholder={placeholder + (required ? " *" : "")}
          type={toggle}
          className={cn}
          value={value}
          onChange={onChange}
          maxLength={max}
        />
      ) : (
        <input
          required={required}
          placeholder={placeholder + (required ? " *" : "")}
          type={type === "number" ? "text" : type}
          className={cn}
          value={value}
          onChange={onChange}
          maxLength={max}
        />
      )}
      {type === "password" && (
        <button
          type="button"
          className="grid place-items-center w-[50px] h-[50px] absolute  right-0  cursor-pointer bottom-0"
          onClick={handleToggle}
        >
          <FaEye color={toggle === "password" ? "#666666" : "#4972D2"} />
        </button>
      )}
    </label>
  );
};

export default TextField;
