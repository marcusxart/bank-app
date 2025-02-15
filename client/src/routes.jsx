import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthWrapper from "./components/authWrapper";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" />,
  },

  //auth
  {
    path: "auth",
    element: <AuthWrapper />,
    children: [
      { index: true, element: <Navigate to="/auth/sign-in" /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "create-account", element: <SignUp /> },
    ],
  },
]);

export default routes;
