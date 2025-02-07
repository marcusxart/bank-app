import React from "react";
import { Link, Outlet } from "react-router-dom";
import MaxContainer from "./maxContainer";
import variables from "../variables";
import useScrollTracker from "../hooks/custom/useScrollTracker";
import classNames from "classnames";

const LandingLayout = () => {
  const { y } = useScrollTracker();
  return (
    <div className="min-h-[100dvh]">
      <Nav y={y} />
      <div className={classNames("min-h-[200vh]", { "pt-[90px]": y > 80 })}>
        <Outlet />
      </div>
    </div>
  );
};

const Nav = ({ y }) => {
  const navLink = [
    {
      text: "Accounts",
      list: [
        { text: "Savings account" },
        { text: "Checking account" },
        { text: "Current account" },
      ],
    },
    {
      text: "loans",
      list: [
        { text: "Personal loans" },
        { text: "Auto loans" },
        { text: "Mortgages" },
        { text: "Student loans" },
      ],
    },
    { text: "about us" },
    { text: "contact us" },
    { text: "Online Banking" },
  ];

  const linkCn =
    "font-semibold capitalize relative before:absolute before:left-0 before:right-0 before:h-[2px] group-hover:before:bg-white before:bottom-[-10px] before:transition-all before:duration-300";
  return (
    <nav className="w-full text-white">
      <div className="h-[80px] w-full bg-secondary-2 grid place-items-center">
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
          "h-[90px] grid place-items-center w-full bg-primary",
          {
            "fixed top-0 left-0 right-0 z-10": y > 80,
          }
        )}
      >
        <MaxContainer>
          <div className="relative grid place-items-center ">
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
                    <Link className={linkCn}>{link.text}</Link>
                  )}

                  {link.list && (
                    <ul
                      className={classNames(
                        "p-[12px] flex-col absolute left-0 bg-white text-dark-text z-20 gap-[4px] top-[72px]  hidden group-hover:flex"
                      )}
                    >
                      {link?.list.map((item, idx) => (
                        <li key={idx} className="text-[14px] ">
                          <Link className="block px-[12px] py-[6px] whitespace-nowrap w-full hover:bg-hover transition-all duration-300 rounded hover:text-secondary">
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
        </MaxContainer>
      </div>
    </nav>
  );
};

export default LandingLayout;
