import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "./components/landingLayout";
import HomePage from "./pages/home";
import Savings from "./pages/accounts/savings";
import Checking from "./pages/accounts/checking";
import Current from "./pages/accounts/current";
import About from "./pages/about";
import Contact from "./pages/contact";
import Personal from "./pages/loans/personal";
import Student from "./pages/loans/student";
import Auto from "./pages/loans/auto";
import Mortgages from "./pages/loans/mortgages";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <LandingLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "savings-accounts", element: <Savings /> },
          { path: "checking-accounts", element: <Checking /> },
          { path: "current-accounts", element: <Current /> },
          { path: "about-us", element: <About /> },
          { path: "contact-us", element: <Contact /> },
          { path: "personal-loans", element: <Personal /> },
          { path: "student-loans", element: <Student /> },
          { path: "auto-loans", element: <Auto /> },
          { path: "mortgages", element: <Mortgages /> },
        ],
      },
    ],
  },
]);

export default routes;
