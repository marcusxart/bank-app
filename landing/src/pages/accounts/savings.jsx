import React from "react";
import ContentLayout from "../../components/contentLayout";
import fatherSon from "../../assets/images/father-son.webp";

const Savings = () => {
  return (
    <ContentLayout bg={fatherSon}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Savings Accounts</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Smart Savings for a Secure Future
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <div>
            <h2>Why Choose Our Savings Account?</h2>
            <p>
              A savings account is more than just a place to store money it’s a
              foundation for financial growth. With our competitive interest
              rates, secure banking, and easy access, you can watch your savings
              grow while maintaining financial flexibility.
            </p>
          </div>
          <div>
            <h2>Key Features & Benefits</h2>
            <ul className="list-disc pl-[24px]">
              <li>
                <p>
                  Make your money work for you with attractive interest rates
                  that help you grow your savings over time. The more you save,
                  the more you earn!
                </p>
              </li>
              <li>
                <p>
                  Your money is always within reach. Withdraw, deposit, and
                  transfer funds seamlessly through our mobile app or online
                  banking.
                </p>
              </li>
              <li>
                <p>
                  Rest easy knowing that your savings are protected with
                  top-tier security measures, including encryption, multi-factor
                  authentication, and fraud protection.
                </p>
              </li>
              <li>
                <p>
                  Enjoy a transparent banking experience with no hidden charges.
                  Our savings account comes with low or no maintenance fees,
                  giving you more value for your money
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2>Start Saving Today!</h2>
            <p>
              Take control of your financial future with a savings account
              designed to help you succeed. Open your account today and start
              building your wealth, one step at a time.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Savings;
