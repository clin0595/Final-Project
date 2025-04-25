export const convertToCurrencyFormat = (num: string) => {
  let amount: string = Number(num).toFixed(2);
  let [dollars, cents] = amount.split('.');
  if (cents === "00") {
    cents = ".00";
  } else {
    cents = `.${cents}`;
  }
 return dollars + cents;
};

