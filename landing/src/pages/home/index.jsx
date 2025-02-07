import React from "react";
import manInBoat from "../../assets/images/man-in-boat.webp";
import helpersPeople from "../../assets/images/helpers.webp";
import withFlowers from "../../assets/images/with-flowers.webp";
import customer from "../../assets/images/customer-services.webp";
import MaxContainer from "../../components/maxContainer";
import Button from "../../components/button";
import { BsPiggyBank } from "react-icons/bs";
import { RxHome } from "react-icons/rx";
import { IoCarSportOutline } from "react-icons/io5";
import { GoMortarBoard } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { Parallax } from "react-scroll-parallax";
import variables from "../../variables";
import Footer from "../../components/footer";

const HomePage = () => {
  const products = [
    { text: "Savings", icon: BsPiggyBank },
    { text: "Mortgage", icon: RxHome },
    { text: "Auto loans", icon: IoCarSportOutline },
    { text: "Student loans", icon: GoMortarBoard },
    { text: "Special Offers", icon: FaRegStar },
  ];
  return (
    <div className="flex w-full gap-[80px] flex-col">
      <div>
        <div className="h-[700px] w-full relative text-white overflow-hidden">
          <Parallax className="w-full h-full" speed={-30}>
            {" "}
            <img
              src={manInBoat}
              alt=""
              className="w-full h-full object-cover opacity-80  object-top"
            />
          </Parallax>

          <div className="bg-gradient-1 absolute inset-0 "></div>
          <div className="bg-gradient-2 absolute top-0 left-0 right-0 w-full h-[292px]"></div>
          <div className="bg-gradient-3 absolute bottom-0 left-0 right-0 w-full h-[292px]"></div>
          <div className="inset-0 absolute w-full grid place-items-center text-center">
            <MaxContainer>
              <div>
                <h1 className="uppercase text-[72px] font-semibold header-shadow leading-[1.2]">
                  Turn your dreams into reality, one step at a time
                </h1>

                <p className="mt-[10px] font-asap text-[28px] font-bold leading-[1.7]">
                  Start your journey today with the right plan and support
                </p>
              </div>
              <div className="flex justify-center items-center w-full gap-[10px] pt-[30px]">
                <Button text="Learn more" />
                <Button text="Contact us" type="secondary" />
              </div>
            </MaxContainer>
          </div>
        </div>
        <div className="bg-primary text-center">
          <MaxContainer>
            <div className="flex flex-col w-full gap-[30px] pb-[40px]">
              <div className="pb-[20px] relative before:absolute before:w-[100px] before:h-[3px] before:bg-white before:bottom-0 before:left-1/2 before:-translate-x-1/2 text-white">
                <h2 className="text-[40px] font-medium leading-[1.2]">
                  Products & Services
                </h2>
              </div>
              <ul className="grid grid-cols-5 gap-[24px] text-icon-white">
                {products?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col justify-center items-center"
                  >
                    <item.icon size={72} />
                    <p className="mt-[8px] text-[18px] font-medium">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </MaxContainer>
        </div>
      </div>
      <MaxContainer>
        <div className="w-full flex flex-col gap-[40px]">
          <div className="pb-[20px] relative before:absolute before:w-[100px] before:h-[3px] before:bg-primary before:bottom-0 before:left-1/2 before:-translate-x-1/2 text-dark-text text-center">
            <h2 className="text-[40px] font-medium leading-[1.2] capitalize">
              Empowering Communities Together
            </h2>
            <p className="max-w-[720px] opacity-80 mx-auto mt-[8px]">
              Our commitment to communities goes beyond quick fixes. It’s about
              building trust, driving change, and creating a lasting positive
              impact.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-[32px]">
            <div className="shadow-md rounded-[8px] overflow-hidden">
              <div className="w-full h-[320px] overflow-hidden">
                <Parallax className="w-full h-full" speed={-10}>
                  <img
                    src={helpersPeople}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Parallax>
              </div>
              <div className="pt-[24px] px-[32px] pb-[32px]">
                <div className="mb-[24px]">
                  <h3 className="text-[28px] font-semibold text-primary capitalize">
                    Who we are
                  </h3>
                  <p className="text-dark-text mt-[4px]">
                    {variables.name} is committed to fostering stronger
                    communities by promoting diversity, equity, and inclusion,
                    empowering economic growth, and supporting sustainable
                    initiatives.
                  </p>
                </div>
                <Button text="Learn more" />
              </div>
            </div>
            <div className="shadow-md rounded-[8px] overflow-hidden">
              <div className="w-full h-[320px] overflow-hidden">
                <Parallax className="w-full h-full" speed={-10}>
                  <img
                    src={withFlowers}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Parallax>
              </div>
              <div className="pt-[24px] px-[32px] pb-[32px]">
                <div className="mb-[24px]">
                  <h3 className="text-[28px] font-semibold text-primary capitalize">
                    Our commitment to communities
                  </h3>
                  <p className="text-dark-text mt-[4px]">
                    We are more than just a part of our communities—we are
                    deeply rooted in them. Through dedication and action, we
                    strive to empower customers and neighborhoods, helping them
                    grow and thrive across the nation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxContainer>

      <div>
        <div className="w-full h-[440px] overflow-hidden relative">
          <Parallax className="w-full h-full" speed={-20}>
            <img
              src={customer}
              alt=""
              className="w-full h-full object-cover opacity-80 object-top"
            />
          </Parallax>
          <div className="bg-gradient-1 absolute inset-0 "></div>

          <div className="bg-gradient-3 absolute bottom-0 left-0 right-0 w-full h-[292px]"></div>

          <div className="inset-0 absolute w-full grid place-items-center text-white">
            <MaxContainer>
              <div className="grid grid-cols-2 w-full">
                <div className="">
                  <h2 className="uppercase text-[52px] font-semibold  leading-[1.2] font-asap">
                    Want to get in touch with us?
                  </h2>

                  <p className="mt-[10px] font-asap text-[20px] font-medium ">
                    Contact us today to learn more about joining{" "}
                    {variables.name} and why we're the best choice for you!
                  </p>
                </div>
                <div className="grid w-full place-items-center">
                  <button className="uppercase bg-white text-primary h-[48px] px-[30px] text-[13px] font-bold font-open-sans rounded-[40px]">
                    Contact us
                  </button>
                </div>
              </div>
            </MaxContainer>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
