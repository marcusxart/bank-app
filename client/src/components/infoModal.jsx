import ModalWrapper from "./modalContainer";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import classNames from "classnames";

const InfoModal = ({ type = "success", onClose, onClick, message = "" }) => {
  return (
    <ModalWrapper>
      <div className="px-[24px] w-full max-w-[440px]">
        <div className="w-full  bg-white py-[24px] px-[40px] rounded-md relative">
          {type === "warning" && (
            <button
              className="absolute w-[40px] h-[40px] grid place-items-center bg-white rounded-full right-[-20px] top-[-20px]"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
          )}
          <div className="h-[50px] relative">
            <div
              className={classNames(
                "absolute bottom-[16px] border-[4px] rounded-full z-[3]  border-solid border-white w-[80px] h-[80px] left-1/2 -translate-x-1/2 text-white grid place-items-center",
                {
                  "bg-success": type == "success",
                  "bg-error": type == "error",
                  "bg-warning": type == "warning",
                }
              )}
            >
              {type === "success" ? (
                <FaCheck size={40} />
              ) : type === "warning" ? (
                <IoWarningOutline size={40} />
              ) : (
                <IoMdClose size={40} />
              )}
            </div>
          </div>
          <div className="text-center font-open-sans  flex flex-col gap-[8px]">
            <h2 className="text-[28px] font-semibold">
              {type === "success"
                ? "Success!"
                : type === "warning"
                ? "Warning!"
                : "Uh oh..."}
            </h2>
            {message && (
              <p className="text-[14px] text-gray-500 font-medium">{message}</p>
            )}
          </div>
          {type === "warning" ? (
            <button
              onClick={onClick}
              className={classNames(
                "w-full h-[48px] font-open-sans font-semibold text-white mt-[24px] bg-warning"
              )}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={onClose}
              className={classNames(
                "w-full h-[48px] font-open-sans font-semibold text-white mt-[24px]",
                { "bg-success": type == "success", "bg-error": type == "error" }
              )}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default InfoModal;
