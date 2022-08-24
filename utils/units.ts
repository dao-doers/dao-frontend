import { BigNumber, utils } from 'ethers';

const PCKB_DECIMALS = 18;
const PCKB_DECIMALS_MULTIPLIER = BigNumber.from(10).pow(PCKB_DECIMALS);

export function tributeTokenToDisplayValue(value: BigNumber) {
  return utils.formatUnits(value, PCKB_DECIMALS);
}

export function tributeTokenToWei(value: number) {
  return BigNumber.from(value).mul(PCKB_DECIMALS_MULTIPLIER);
}
