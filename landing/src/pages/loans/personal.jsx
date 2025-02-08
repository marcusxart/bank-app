import React from "react";
import ContentLayout from "../../components/contentLayout";
import family from "../../assets/images/family.webp";

const Personal = () => {
  return (
    <ContentLayout bg={family}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Personal loans</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Instant Funds for Life’s Important Moments
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            Life is full of unexpected expenses, and whether it's for medical
            emergencies, travel, weddings, or home improvements, our Personal
            Loan provides quick access to funds with minimal paperwork and
            flexible repayment options. Get the financial support you need
            whenever you need it.
          </p>
          <div>
            <h2>Why Choose Our Personal Loan?</h2>
            <p>
              Unlike other loans, a personal loan does not require any
              collateral, making it a convenient option for individuals looking
              for immediate financial assistance. Our loan comes with
              competitive interest rates and instant approvals, so you can
              secure funds without long waiting periods.
            </p>
            <p className="mt-2">
              We offer customizable repayment plans, allowing you to choose a
              tenure that fits your budget. Whether you need a small loan for
              short-term needs or a larger amount for major expenses, our
              flexible loan limits ensure that you get exactly what you need.
              Plus, you can use the funds for any purpose, from consolidating
              debt to funding personal projects.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Personal;
