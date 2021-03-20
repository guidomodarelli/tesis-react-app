export const Console = {
  log(...params) {
    if (params.length < 2) {
      throw new Error('[Console.log] Al menos debe haber dos parametros');
    }
    if (params.length > 1 && typeof params[0] !== 'string') {
      throw new Error('[Console.log] El primer parametro debe ser un string');
    }
    // eslint-disable-next-line no-console
    console.log(...params);
  },
};

// https://stackoverflow.com/questions/65364182/remove-keys-with-empty-or-null-values-in-qs-stringify-when-constructing-query-pa
/**
 * @description Elimina los campos vacios o indefinidos
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export function filterNonNull(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_k, v]) => v || v === false,
    ),
  );
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 *
 * @param {number} num
 * @returns {string}
 */
// https://blog.abelotech.com/posts/number-currency-formatting-javascript/
export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
