/* eslint-disable default-case */
const displayBlockchainError = (code: any) => {
  switch (code) {
    case 4001:
      return 'User denied message signature.';
    default:
      return 'Something went wrong';
  }
};

export default displayBlockchainError;
