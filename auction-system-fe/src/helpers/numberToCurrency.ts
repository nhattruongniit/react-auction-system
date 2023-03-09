export const numberToCurrency = (
  number: number = 0,
  currency: string = "USD"
) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency,
  });
};
