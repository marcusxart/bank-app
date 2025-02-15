import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { forwardRef, useState } from "react";

const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
  <button type="button" ref={ref} onClick={onClick} className={className}>
    <span>{value || "MM/DD/YYYY"}</span>
    <IoIosArrowDown />
  </button>
));
CustomInput.displayName = "CustomInput";

const InputCalender = ({ label, selected, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="w-full relative font-open-sans block">
      <div>
        {" "}
        {label && (
          <p className="text-[14px] text-dark-text  font-medium mb-1  capitalize">
            {label}
          </p>
        )}
        <DatePicker
          tabIndex={0}
          selected={selected}
          onChange={onChange}
          onCalendarClose={() => {
            setIsFocus(false);
          }}
          onCalendarOpen={() => {
            setIsFocus(true);
          }}
          customInput={
            <CustomInput
              className={classNames(
                "h-[50px] w-full  px-[16px] flex items-center justify-between bg-white text-[14px] border-solid border-[1.6px]",
                {
                  "text-gray-400": !selected,
                  "border-gray-300": !isFocus,
                  "border-secondary": isFocus,
                }
              )}
            />
          }
        />
      </div>
    </div>
  );
};

export default InputCalender;
