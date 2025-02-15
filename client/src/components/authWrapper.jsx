import { Outlet } from "react-router-dom";
import bg from "../assets/images/abstract.webp";
import Logo from "./logo";
// import axios from "axios";
const AuthWrapper = () => {
  const quotes = [
    {
      text: "Do not save what is left after spending, but spend what is left after saving.",
      author: "Warren Buffett",
    },
    {
      text: "A big part of financial freedom is having your heart and mind free from worry about the what-ifs of life.",
      author: "Suze Orman",
    },
    {
      text: "The four most dangerous words in investing are: ‘this time it’s different.’",
      author: "Sir John Templeton",
    },
    {
      text: "Someone’s sitting in the shade today because someone planted a tree a long time ago.",
      author: "Warren Buffett",
    },
    {
      text: "Know what you own, and know why you own it.",
      author: "Peter Lynch",
    },
    {
      text: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin",
    },
    {
      text: "The goal isn’t more money. The goal is living life on your terms.",
      author: "Chris Brogan",
    },
    {
      text: "Risk comes from not knowing what you’re doing.",
      author: "Warren Buffett",
    },
    {
      text: "Wealth is not about having a lot of money; it’s about having a lot of options.",
      author: "Chris Rock",
    },
    {
      text: "It’s not whether you’re right or wrong that’s important, but how much money you make when you’re right and how much you lose when you’re wrong.",
      author: "George Soros",
    },
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  const quote = getRandomQuote();

  // const getFiles = async () => {
  //   const res = await axios.get(
  //     "https://8ft3jx2x-8004.uks1.devtunnels.ms/media/v1/instructor/filemanager/?_account=742c5432ef",
  //     {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMTI2MzAzLCJqdGkiOiJlYjA2MGE3OGMwMzE0OWRlYjUwNjBiZGM0OTVhYTI0MyIsInVzZXJfaWQiOiIwNDE4YWZlZDcyIiwicm9sZXMiOltdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMi0xNFQxMTo1ODoyMy4yNjEyOTkrMDA6MDAifQ.lmrSIsocjzQcLiy9Fj8nWnvGTCiP5jz7BkHXtdHX5VU`,
  //       },
  //     }
  //   );
  //   console.log(res.data);
  // };

  // getFiles();
  return (
    <div className="grid grid-cols-[45%,55%] h-[100dvh]">
      <div className="w-full h-full relative">
        <div className="text-white absolute z-[3] top-[40px] left-[80px]">
          <Logo />
        </div>
        <img
          src={bg}
          alt=""
          className="w-full h-full object-cover absolute inset-0 opacity-80"
        />
        <div className="relative z-[2] w-full h-full bg-[rgba(0,0,0,0.5)] grid place-items-center">
          <div className="text-white">
            <div className="w-full px-[80px]">
              <h2 className="text-[32px] italic font-medium">
                &quot;{quote.text}&quot;
              </h2>
              <p className="text-[#fff] opacity-85 text-[18px] mt-2">
                ~ {quote.author}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid place-items-center">
        <div className="w-full max-w-[600px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
