export const AutoPoolTotalIncomeCal = (amountArr) => {
  let totalAmount = 0;
  if (amountArr?.autoPoolData) {
    const objT = Object.entries(amountArr?.autoPoolData).map((d) => d[1]);
    for (let i = 0; i < objT.length; i++) {
      const element = objT[i];
      for (let j = 0; j < element.length; j++) {
        totalAmount += element[j].total;
      }
    }
  }
  return totalAmount;
};
