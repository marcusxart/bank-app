import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/icon.png";

const Logo = ({ to }) => {
  return (
    <Link to={to ?? "/"} className="text-font-dark flex items-center">
      <img src={icon} alt="" className="w-[58px] h-[58px]" />
      <p className="font-lato font-bold text-[22px] leading-[22px] tracking-wide">
        <span>AxiaTrust</span> <br /> Bank
      </p>
    </Link>
  );
};

export default Logo;
