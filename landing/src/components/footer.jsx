import React from "react";
import MaxContainer from "./maxContainer";
import { Link } from "react-router-dom";
import variables from "../variables";
import house from "../assets/images/housing-lender.webp";
import ncua from "../assets/images/ncua.webp";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-primary">
      <MaxContainer>
        <div className="pt-[35px] pb-[55px] text-white">
          <div className="flex items-center gap-[24px] justify-between [&_p]:text-[14px] [&_p]:font-medium ">
            <Link>Logo</Link>
            <p>Phone: {variables.phoneNo}</p>
            <p>Email: {variables.email}</p>
            <p className="w-full max-w-[180px] text-center">
              {variables.address}
            </p>
            <img src={house} alt="" />
            <img src={ncua} alt="" className="w-[115px]" />
          </div>
          <div className="my-[28px] text-[12px] font-semibold  border-y-[1.2px] py-[28px]">
            <p className="text-white font-medium border-white">
              ©{year} {variables.fullname}
            </p>
          </div>
          <div className="text-light-text ">
            <h2 className="text-[14px] font-semibold">
              Important Legal Disclosures & Information
            </h2>
            <div className="text-[12px] mt-[10px] flex flex-col gap-[6px]">
              <p>
                {variables.fullname} provides information about and access to
                accounts and financial services provided by{variables.fullname}.
                and its affiliates in the United States and its territories. It
                does not, and should not be construed as, an offer, invitation
                or solicitation of services to individuals outside of the United
                States.
              </p>
              <p>
                Terms, conditions and fees for accounts, products, programs and
                services are subject to change. Not all accounts, products, and
                services as well as pricing described here are available in all
                jurisdictions or to all customers. Your eligibility for a
                particular product and service is subject to a final
                determination by {variables.fullname}. Your country of
                citizenship, domicile, or residence, if other than the United
                States, may have laws, rules, and regulations that govern or
                affect your application for and use of our accounts, products
                and services, including laws and regulations regarding taxes,
                exchange and/or capital controls that you are responsible for
                following.
              </p>
            </div>
          </div>
        </div>
      </MaxContainer>
    </div>
  );
};

export default Footer;
