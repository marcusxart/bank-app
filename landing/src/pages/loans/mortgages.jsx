import React from "react";
import ContentLayout from "../../components/contentLayout";
import home from "../../assets/images/sweet-home.webp";

const Mortgages = () => {
  return (
    <ContentLayout bg={home}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Mortgages</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Turn Your Dream Home into Reality with Easy Financing
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            Owning a home is a lifelong dream for many, and we’re here to help
            you achieve it. Whether you're a first-time buyer or looking to
            refinance your existing home, our Mortgage Loan offers affordable
            interest rates, flexible repayment terms, and expert guidance every
            step of the way.
          </p>
          <div>
            <h2>Why Choose Our Mortgage Loan?</h2>
            <p>
              A home is one of the biggest investments you'll make, and our
              mortgage loan is designed to make the process smooth and
              stress-free. We offer both fixed and variable interest rates,
              giving you the freedom to choose a plan that best suits your
              financial situation. Our long-term repayment options allow you to
              comfortably repay the loan over an extended period without
              financial strain.
            </p>
            <p className="mt-2">
              Our mortgage loan covers home purchases, refinancing, and
              renovations, so whether you’re buying a new house, improving your
              current home, or consolidating an existing mortgage, we have the
              right solution for you. With a quick and easy pre-approval
              process, you can start house-hunting with confidence.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Mortgages;
