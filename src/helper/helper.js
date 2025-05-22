import millify from "millify";

// const formatter = new Intl.NumberFormat("en-us", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 3,
// });

export const format = (value) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const formatted = millify(absValue, {
    precision: 3, // keep 2 decimal points
    lowercase: false,
  });

  return `${isNegative ? "-" : ""}$${formatted}`;
};
