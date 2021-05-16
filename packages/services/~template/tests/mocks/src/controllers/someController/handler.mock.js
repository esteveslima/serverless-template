export const sut = {
  PARAMETERS: {
    OK: {
      body: {
        params: {
          abc: 123,
        },
      },
    },
    ERROR: {

    },
  },
};

export const otherResource = {
  RESULT: {
    OK: {

    },
    ERROR: () => { throw new Error('ERROR'); },
  },
};
