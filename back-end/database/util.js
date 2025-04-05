export const getResult = (data = null, code = 200) => ({
  code,
  error: null,
  data,
});

export const getError = (errorMessage = "Unknown error", code = 500) => ({
  code,
  error: errorMessage,
  data: null,
});
