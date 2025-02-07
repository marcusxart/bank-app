import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const ServiceCard = ({ icon, title, desc, link }) => {
  return (
    <div className="h-[324px] border border-solid border-border-light border-r-0 first:border-l-0 py-[40px] px-[32px] transition-all duration-300 flex flex-col w-full relative [&::before]:hover:opacity-100 before:absolute before:inset-0  before:border-t-[4px] before:border-solid before:border-primary before:bg-white before:z-[-1] before:opacity-0 before:block before:transition-all before:duration-300">
      <span className="">{icon}</span>
      <div className="flex flex-col gap-[20px] flex-1">
        <div className="pt-[24px] flex flex-col gap-[12px]">
          <h3 className="transition-all duration-300 text-[20px] font-semibold">
            {link ? (
              <Link to={link} className="hover:text-primary">
                {title}
              </Link>
            ) : (
              <p>{title}</p>
            )}
          </h3>
          <p className="leading-[1.8em]">{desc}</p>
        </div>
        {link && (
          <Link
            to={link}
            className="inline-flex items-center uppercase leading-[1.7em] gap-1 font-medium"
          >
            More <IoIosArrowForward size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
