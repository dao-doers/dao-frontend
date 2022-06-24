/* eslint-disable import/prefer-default-export */
import { BigNumber, utils } from 'ethers';

export function shannonsToDisplayValue(value: BigNumber) {
  return utils.formatUnits(value, 8);
}
