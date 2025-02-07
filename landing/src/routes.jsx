import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "./components/landingLayout";
import HomePage from "./pages/home";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <LandingLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]);

export default routes;
