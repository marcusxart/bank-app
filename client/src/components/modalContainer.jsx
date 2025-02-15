import classNames from "classnames";

const ModalWrapper = ({ children, zMore, isAbsolute }) => {
  return (
    <div
      className={classNames(
        "inset-0 h-[100dvh] bg-[rgba(0,0,0,0.4)]   grid place-items-center",
        { "z-[9999]": zMore },
        { "z-[99]": !zMore },
        { absolute: isAbsolute },
        { fixed: !isAbsolute }
      )}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
