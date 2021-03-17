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
