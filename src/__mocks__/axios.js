module.exports = {
    get: jest.fn(() => {
      return Promise.resolve({ data: {} });
    }),
};