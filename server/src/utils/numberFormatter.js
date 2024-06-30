exports.numberFormatter = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("Not a number or is null");
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  return formatter.format(number);
};
