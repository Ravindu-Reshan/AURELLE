// A product is out of stock if EITHER the admin has manually marked it as
// out of stock, OR its stock count has reached 0.
export function isOutOfStock(product) {
  return Boolean(product?.outOfStock) || product?.stock === 0;
}
