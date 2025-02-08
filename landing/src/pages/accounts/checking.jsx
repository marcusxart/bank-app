import React from "react";
import ContentLayout from "../../components/contentLayout";
import guyTalking from "../../assets/images/guys-talking.webp";

const Checking = () => {
  return (
    <ContentLayout bg={guyTalking}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Checking Accounts</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Effortless Banking for Everyday Life
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <div>
            <h2>Why Choose Our Checking Account?</h2>
            <p>
              Your checking account is the heart of your daily finances. Whether
              you're paying bills, shopping, or managing expenses, our checking
              account offers the flexibility, security, and convenience you
              need—all in one place.
            </p>
          </div>
          <div>
            <h2>Key Features & Benefits</h2>
            <ul className="list-disc pl-[24px]">
              <li>
                <p>
                  Enjoy 24/7 access to your funds with a secure debit card and
                  mobile banking. Make payments, withdraw cash, and transfer
                  money anytime, anywhere.
                </p>
              </li>
              <li>
                <p>
                  Pay bills, send money, or set up direct deposits with ease.
                  Our secure payment system ensures your transactions are safe
                  and swift.
                </p>
              </li>
              <li>
                <p>
                  We believe in transparent banking. Enjoy a checking account
                  with no hidden fees and minimal to no monthly maintenance
                  charges.
                </p>
              </li>
              <li>
                <p>
                  Your security is our priority. We provide multi-layer
                  encryption, instant fraud alerts, and card-locking features to
                  keep your money safe.
                </p>
              </li>
              <li>
                <p>
                  Manage your account from your phone or computer with real-time
                  transaction tracking, spending insights, and mobile check
                  deposits.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2>Bank Smarter, Live Better</h2>
            <p>
              Open a checking account today and experience a hassle-free way to
              manage your money. With security, convenience, and zero hidden
              fees, we make everyday banking simple.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Checking;
