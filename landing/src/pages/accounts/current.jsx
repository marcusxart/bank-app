import React from "react";
import ContentLayout from "../../components/contentLayout";
import rich from "../../assets/images/rich.webp";

const Current = () => {
  return (
    <ContentLayout bg={rich}>
      <div className="font-sans">
        <div className="mb-[32px] lg:mb-[52px]">
          <h1>Current Accounts</h1>
          <p className="uppercase text-[#747474] text-[13px] tracking-[2px]">
            Power Up Your Business & Daily Transactions
          </p>
        </div>
        <div className="text-dark-text [&_h2]:font-semibold [&_h2]:text-[18px]   lg:[&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h2]:capitalize [&_h2]:mb-[8px] [&_p]:text-[#7a7a7a] [&_p]:font-open-sans [&_p]:leading-[1.7] flex w-full flex-col gap-[24px] lg:gap-[32px] [&_p]:text-[14px] lg:[&_p]:text-base">
          <div>
            <h2>Why Choose Our Current Account?</h2>
            <p>
              A current account is essential for businesses, entrepreneurs, and
              individuals who need seamless transactions, higher withdrawal
              limits, and efficient money management. Our account ensures smooth
              banking with no restrictions on daily transactions and 24/7 access
              to your funds.
            </p>
          </div>
          <div>
            <h2>Key Features & Benefits</h2>
            <ul className="list-disc pl-[24px]">
              <li>
                <p>
                  Enjoy unlimited deposits and withdrawals without any
                  restrictions, ensuring smooth financial operations for your
                  business or personal needs.
                </p>
              </li>
              <li>
                <p>
                  Make bulk payments, handle payroll, and manage invoices
                  effortlessly with our dedicated current account services.
                </p>
              </li>
              <li>
                <p>
                  Move money quickly and securely with online banking, RTGS,
                  NEFT, and instant UPI transactions.
                </p>
              </li>
              <li>
                <p>
                  Track expenses, monitor transactions, and generate account
                  statements instantly through our mobile app or online banking
                  platform.
                </p>
              </li>
              <li>
                <p>
                  Benefit from top-tier security with encrypted transactions,
                  fraud detection, and instant alerts for any unusual activity.
                </p>
              </li>
              <li>
                <p>
                  Make international transactions and business payments with
                  ease, using our multi-currency banking services.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2>Banking That Works for You</h2>
            <p>
              Experience a current account that matches your financial
              needs—whether you're a business owner, freelancer, or
              professional. Open your account today and enjoy seamless
              transactions, zero restrictions, and high security.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Current;
