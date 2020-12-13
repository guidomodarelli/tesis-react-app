const Console = {
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

export default Console;
