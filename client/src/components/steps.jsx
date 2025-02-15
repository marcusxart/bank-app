import classNames from "classnames";
import { useEffect } from "react";

const StepsComponent = ({ count = 4, onChange, value }) => {
  const list = [...Array(count)].map((_, idx) => ({
    status: "wait",
    value: idx + 1,
  }));

  useEffect(() => {
    onChange && onChange(list);
  }, []);

  return (
    <div className="flex w-full max-w-[300px] gap-1 mx-auto">
      {(value || list)?.map((val) => (
        <div
          className={classNames(
            "flex-1 first:flex-shrink-1 h-1",
            { "bg-gray-300": val?.status === "wait" },
            { "bg-secondary": val?.status === "done" }
          )}
          key={val?.value}
        ></div>
      ))}
    </div>
  );
};

export default StepsComponent;
