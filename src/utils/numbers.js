/* eslint-disable import/prefer-default-export */
/** @param {number} num */
// https://blog.abelotech.com/posts/number-currency-formatting-javascript/
export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
