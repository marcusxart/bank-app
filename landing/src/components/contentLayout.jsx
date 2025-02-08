import React from "react";
import MaxContainer from "./maxContainer";
import variables from "../variables";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Footer from "./footer";
import { MdOutlinePhone } from "react-icons/md";
import { LuMailOpen } from "react-icons/lu";

const ContentLayout = ({ bg, children }) => {
  const btn =
    "h-[60px] w-full  uppercase text-center grid place-items-center text-white font-open-sans text-[13px] font-bold";
  return (
    <div className="w-full flex flex-col gap-[40px] lg:gap-[60px]">
      <div className="w-full h-[30vh] lg:h-[40vh]">
        {bg && <img src={bg} alt="" className="w-full h-full object-cover" />}
      </div>
      <MaxContainer>
        <div className="pb-[40px]">
          <div className="w-full flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[50px] items-center lg:items-start">
            <div className="flex  flex-shrink-0 w-[260px]">
              <div className="w-full  flex flex-col gap-[25px]">
                {" "}
                <h2 className="text-[#383838] font-bold leading-[1.2]  text-[24px] w-full">
                  Our Services
                </h2>
                <div className="p-[35px] bg-secondary-2 text-white">
                  <h3 className="uppercase text-[15px] font-semibold mb-[12px] font-open-sans">
                    CONTACT US!
                  </h3>
                  <Link className="text-[#a3a9f6] leading-[1.7] text-[13px] font-open-sans">
                    Contact us today to find out more about why joining the{" "}
                    {variables.fullname} is the right choice for you!
                  </Link>
                </div>{" "}
                <Link
                  className={classNames(btn, { "bg-secondary-2 ": true })}
                  to="/contact-us"
                >
                  Reach Us Now
                </Link>
                <div className="p-[35px] border-secondary-2 border text-secondary-2 font-open-sans">
                  <h3 className="uppercase text-[15px] font-semibold mb-[12px] font-open-sans">
                    Need help ?
                  </h3>
                  <ul className="[&_svg]:text-accent flex flex-col w-full gap-[8px]">
                    <li className="flex items-center gap-2">
                      <MdOutlinePhone />{" "}
                      <a
                        href={`tel:${variables.phoneNo}`}
                        className="text-[14px]"
                      >
                        {variables.phoneNo}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <LuMailOpen />{" "}
                      <a
                        href={`mailto:${variables.email}`}
                        className="text-[14px]"
                      >
                        {variables.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:[&_h1]:text-[48px] [&_h1]:text-[32px] lg:[&_h1]:leading-[48px] [&_h1]:leading-[32px] [&_h1]:text-secondary-2 [&_h1]:font-semibold lg:[&_h1]:mb-[16px] [&_h1]:mb-[12px] lg:pt-[44px]">
              {children}
            </div>
          </div>
        </div>
      </MaxContainer>
      <Footer />
    </div>
  );
};

export default ContentLayout;
