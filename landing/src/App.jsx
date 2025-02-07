import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ParallaxProvider } from "react-scroll-parallax";

export default function App() {
  return (
    <>
      <ParallaxProvider>
        <RouterProvider router={routes} />
      </ParallaxProvider>
    </>
  );
}
