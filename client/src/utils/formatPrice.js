// Formats a number as Sri Lankan Rupees, e.g. formatPrice(1500) -> "Rs. 1,500.00"
export function formatPrice(amount) {
  return `Rs. ${Number(amount).toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
