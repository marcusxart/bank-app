import ModalWrapper from "./modalContainer";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = ({ isAbsolute = false }) => {
  return (
    <ModalWrapper zMore isAbsolute={isAbsolute}>
      <FadeLoader color="#fff" />
    </ModalWrapper>
  );
};

export default Loader;
