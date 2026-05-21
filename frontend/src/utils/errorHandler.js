export function getErrorMessage(error) {
  if (error?.response?.data?.errors) {
    return error.response.data.errors.map((e) => e.msg).join(', ');
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}
