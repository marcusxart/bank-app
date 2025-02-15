import CountryList from "country-list-with-dial-code-and-flag";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames";
import OutsideAlerter from "./outsideEventChecker";

const PhoneTextField = ({ label, dialCode = "+1", onChange, value = "" }) => {
  const [toggle, setToggle] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const countryList = CountryList?.getAll()?.map((country) => country.data);

  const country = CountryList.findOneByDialCode(dialCode)?.data;

  const handleToggleOff = () => {
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <OutsideAlerter handleClick={handleToggleOff}>
      <div className="w-full  font-open-sans block relative">
        {label && (
          <p className="text-[14px] text-dark-text  font-medium mb-1  capitalize">
            {label}
          </p>
        )}
        <div
          className={classNames(
            "w-full border-[1.6px] border-solid  h-[50px] flex items-center  gap-2",
            { "border-gray-300": !isFocus, "border-secondary": isFocus }
          )}
          tabIndex={0}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        >
          <button
            className="bg-gray-100 w-[50px] h-full text-gray-400 flex items-center justify-center gap-1  flex-shrink-0 cursor-pointer"
            type="button"
            onClick={handleToggle}
          >
            <span>{country?.flag}</span> <IoIosArrowDown />
          </button>
          <div className="flex-1 flex items-center gap-1 pr-[20px]">
            <span className="text-gray-500">{country?.dial_code}</span>
            <input
              type="text"
              className="w-full border-none outline-none"
              value={value}
              onChange={(e) => {
                const value = e?.target?.value?.replace(/[^0-9]/g, "");
                onChange && onChange(value, dialCode);
              }}
            />
          </div>
        </div>

        {toggle && (
          <ul className="bg-white absolute left-0 right-0 top-[78px] shadow-sm z-[4] text-[14px] p-[4px] border-gray-300 border-solid border-[1.6px] h-[150px] overflow-y-auto">
            {countryList?.map((country, key) => (
              <li
                key={key}
                className="min-h-[34px] flex items-center w-full px-[10px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition duration-300 gap-2 py-2"
                onClick={() => {
                  onChange && onChange(value, country?.dial_code);
                }}
              >
                <span>{country?.flag}</span>
                <div>
                  <p>
                    {country?.name}{" "}
                    <span className="text-gray-500">
                      ({country?.dial_code})
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </OutsideAlerter>
  );
};

export default PhoneTextField;
