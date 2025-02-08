import React from "react";
import ContentLayout from "../../components/contentLayout";
import car from "../../assets/images/car.webp";

const Auto = () => {
  return (
    <ContentLayout bg={car}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Auto loans</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Drive Your Dream Car with Easy & Affordable Financing
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            Owning a car is no longer just a luxury—it’s a necessity. Whether
            you need a vehicle for work, family, or personal convenience, our
            Auto Loan helps you make your dream a reality. With competitive
            interest rates, fast approvals, and flexible repayment options, we
            take the stress out of financing your new or used car.
          </p>
          <div>
            <h2>Why Choose Our Auto Loan?</h2>
            <p>
              A car is a major investment, and we understand the importance of
              affordability. Our auto loan offers low-interest rates to make
              your monthly payments manageable. With our fast and hassle-free
              approval process, you can secure financing quickly and drive home
              your new car in no time.
            </p>
            <p className="mt-2">
              Unlike traditional loans, our auto loan covers both new and
              pre-owned vehicles, ensuring that you have the flexibility to
              choose a car that fits your budget. We also provide customized
              repayment plans, allowing you to select a loan tenure that aligns
              with your financial situation. Plus, existing customers can
              benefit from pre-approved loan offers for an even quicker process.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Auto;
