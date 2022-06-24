/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js';

import numbro from 'numbro';

export const ckbToShannons = (ckb: number) => {
  const shannons = numbro(new BigNumber(ckb).multipliedBy(10 ** 8).toNumber()).format('0.[00]');
  return shannons;
};
