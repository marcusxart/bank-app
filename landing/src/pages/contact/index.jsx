import React from "react";
import ContentLayout from "../../components/contentLayout";
import variables from "../../variables";
import { Link } from "react-router-dom";
import contactImage from "../../assets/images/contact.webp";

const Contact = () => {
  return (
    <ContentLayout bg={contactImage}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1 className="font-bold">
            Want to get in contact with {variables.name}?
          </h1>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            Call us at {variables.phoneNo} or email us at{" "}
            <Link
              className=" font-bold underline text-secondary-2"
              to={`mailto:${variables.email}`}
            >
              {variables.email}
            </Link>
            .
          </p>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Contact;
