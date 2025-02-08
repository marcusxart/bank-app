import React from "react";
import ContentLayout from "../../components/contentLayout";
import students from "../../assets/images/students.webp";

const Student = () => {
  return (
    <ContentLayout bg={students}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Student loans</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Invest in Your Future with Affordable Education Loans
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <p>
            Education opens doors to endless opportunities, and financial
            constraints shouldn’t hold you back from achieving your academic
            dreams. Our Student Loan provides a reliable and affordable way to
            finance your education, ensuring that tuition fees, study materials,
            and living expenses never become an obstacle.
          </p>
          <div>
            <h2>Why Choose Our Student Loan?</h2>
            <p>
              Pursuing higher education requires a significant financial
              commitment, and we’re here to make it easier for you. Our student
              loans come with low-interest rates, allowing students to focus on
              their studies without the burden of heavy monthly payments. We
              offer flexible repayment options, including an extended grace
              period, so you only start repaying after completing your
              education.
            </p>
            <p className="mt-2">
              For eligible applicants, our loan requires no collateral, making
              it easier for students and parents to secure funding. Whether
              you're attending university locally or studying abroad, our loan
              provides comprehensive coverage for tuition fees, books,
              accommodation, and other academic expenses.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Student;
