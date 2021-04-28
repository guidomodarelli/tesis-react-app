/* eslint-disable import/prefer-default-export */
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

