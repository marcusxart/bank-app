import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MaxContainer from "./maxContainer";
import variables from "../variables";
import useScrollTracker from "../hooks/custom/useScrollTracker";
import classNames from "classnames";
import { BsBank2 } from "react-icons/bs";
import { Sling as Hamburger } from "hamburger-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import OutsideAlerter from "./outsideChecker";

const LandingLayout = () => {
  const { y } = useScrollTracker();
  const [toggle, setToggle] = useState(false);

  const path = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && toggle) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = ""; // Restore scroll
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <div className={classNames("min-h-[100dvh]")}>
      <Nav y={y} toggle={toggle} setToggle={setToggle} />
      <div className={classNames({ "pt-[90px]": y > 80 })}>
        <Outlet />
      </div>
    </div>
  );
};
const Dropdown = ({ title, options, close }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <OutsideAlerter handleClick={() => setToggle(false)}>
      <div className="py-[15px]">
        <div
          className="flex w-full items-center justify-between gap-[12px] pr-[12px]  cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <span>{title}</span>
          <MdKeyboardArrowDown />
        </div>
        {toggle && (
          <ul className="mt-[4px] bg-[#2540999a] p-[12px] text-[14px] flex flex-col gap-[12px]">
            {options?.map((v, idx) => (
              <li key={idx}>
                <Link to={v?.route} onClick={close}>
                  {v?.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </OutsideAlerter>
  );
};
const Nav = ({ y, toggle, setToggle }) => {
  const navLink = [
    {
      text: "Accounts",
      list: [
        { text: "Savings accounts", route: "/savings-accounts" },
        { text: "Checking accounts", route: "/checking-accounts" },
        { text: "Current accounts", route: "/current-accounts" },
      ],
    },
    {
      text: "loans",
      list: [
        { text: "Personal loans", route: "/personal-loans" },
        { text: "Auto loans", route: "/auto-loans" },
        { text: "Mortgages", route: "/mortgages" },
        { text: "Student loans", route: "/student-loans" },
      ],
    },
    { text: "about us", route: "/about-us" },
    { text: "contact us", route: "/contact-us" },
    { text: "Online Banking", icon: BsBank2 },
  ];

  const linkCn =
    "font-semibold capitalize relative before:absolute before:left-0 before:right-0 before:h-[2px] group-hover:before:bg-white before:bottom-[-10px] before:transition-all before:duration-300";
  return (
    <>
      {toggle && (
        <ul className="bg-[#17224fcf] pt-[80px] pb-[80px] z-30 inset-0 fixed lg:hidden text-white flex flex-col items-center justify-center font-semibold capitalize text-[16px]  px-[24px]">
          {navLink.map((link, idx) => (
            <li
              key={idx}
              className="w-full border-[#ffffffc0] border-b border-solid "
            >
              {link.list ? (
                <Dropdown
                  title={link.text}
                  options={link.list}
                  close={() => {
                    setToggle(false);
                  }}
                />
              ) : (
                <Link
                  className={`flex items-center gap-[8px]  w-full py-[15px]`}
                  to={link?.route}
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  {link?.icon && <link.icon />}
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      <nav className="w-full text-white">
        <div className="hidden  h-[80px] w-full bg-secondary-2 lg:grid place-items-center">
          <MaxContainer>
            <ul className="flex justify-center items-center [&_li]:px-[12px] font-bold font-open-sans">
              <li>Main Number: {variables.phoneNo}</li>
              <li className="border-x-[2px] border-white">
                Email: {variables.email}
              </li>
              <li>RTN/ABA #: 254074581</li>
            </ul>
          </MaxContainer>
        </div>

        <div
          className={classNames(
            "h-[80px] lg:h-[90px] grid place-items-center w-full  fixed top-0 left-0 right-0 lg:relative  z-50 bg-primary",
            {
              "fixed top-0 left-0 right-0": y > 80,
            }
          )}
        >
          <MaxContainer>
            {/* desktop */}
            <div className="relative lg:grid place-items-center hidden">
              <Link className="absolute left-0">Logo</Link>
              <ul className="flex gap-[36px]">
                {navLink?.map((link, parentIdx) => (
                  <li
                    key={parentIdx}
                    className="group relative h-[80px] flex items-center"
                  >
                    {link.list ? (
                      <span className={linkCn}>{link.text} </span>
                    ) : (
                      <Link
                        className={`${linkCn} flex items-center gap-[8px]`}
                        to={link?.route}
                      >
                        {link?.icon && <link.icon />}
                        {link.text}
                      </Link>
                    )}

                    {link.list && (
                      <ul
                        className={classNames(
                          "p-[12px] flex-col absolute left-0 bg-white text-dark-text z-20 gap-[4px] top-[72px]  hidden group-hover:flex"
                        )}
                      >
                        {link?.list.map((item, idx) => (
                          <li key={idx} className="text-[14px] ">
                            <Link
                              className="block px-[12px] py-[6px] whitespace-nowrap w-full hover:bg-hover transition-all duration-300 rounded hover:text-secondary"
                              to={item?.route}
                            >
                              {item.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between w-full lg:hidden">
              <Link>Logo</Link>
              <Hamburger toggled={toggle} toggle={setToggle} />
            </div>
          </MaxContainer>
        </div>
      </nav>
    </>
  );
};

export default LandingLayout;
