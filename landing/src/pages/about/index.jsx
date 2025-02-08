import React from "react";
import ContentLayout from "../../components/contentLayout";
import variables from "../../variables";
import worker from "../../assets/images/worker.webp";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <ContentLayout bg={worker}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1 className="font-bold">Why {variables.name}?</h1>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            At {variables.name}, we are more than just a financial
            institution—we are your trusted partner in financial growth and
            security. Since our inception, we have been dedicated to empowering
            individuals, businesses, and communities with innovative banking
            solutions, exceptional customer service, and unwavering integrity.
          </p>
          <div>
            <h2>Our Mission</h2>
            <p>
              To provide secure, accessible, and customer-centric banking
              solutions that help individuals and businesses achieve their
              financial goals. We strive to foster financial inclusion and
              empower our customers with the tools they need for a brighter
              future.
            </p>
          </div>
          <div>
            <h2>Our Vision</h2>
            <p>
              To be the most trusted and innovative bank, redefining financial
              services through cutting-edge technology, personalized
              experiences, and a commitment to excellence.
            </p>
          </div>
          <div>
            <h2>Join Us on Your Financial Journey</h2>
            <p>
              At {variables.name}, we are committed to helping you achieve
              financial success. Whether you're saving for the future, managing
              daily expenses, or growing a business, we provide the support and
              solutions you need.
            </p>{" "}
            <Link className="leading-[1.7] font-bold underline text-secondary-2 mt-[4px]">
              Join {variables.name} today!
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default About;
