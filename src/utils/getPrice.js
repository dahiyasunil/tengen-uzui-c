const getDiscountedPrice = (product) => {
  return Math.round(
    product.price.amount -
      (product.price.amount * product.discount.percentage) / 100,
  );
};

export const isOnDiscount = (product) => {
  if (product.discount?.startDate) {
    if (
      Date.now() >= Date.parse(product.discount.startDate) &&
      Date.now() <= Date.parse(product.discount.endDate)
    ) {
      return true;
    }
  }
  return false;
};

export const getFinalPrice = (product) => {
  return isOnDiscount(product)
    ? getDiscountedPrice(product)
    : product.price.amount;
};
