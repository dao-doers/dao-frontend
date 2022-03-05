import * as yup from 'yup';
import Web3 from 'web3';

yup.addMethod(yup.string, 'metamaskAddress', function (errorMessage: string) {
  return this.test('metamask-address', errorMessage, function (value) {
    const { path, createError } = this;
    const isValidAddress = Web3.utils.isAddress(value);

    return isValidAddress ? value : createError({ path, message: errorMessage });
  });
});
