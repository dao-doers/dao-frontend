import { BigNumber, utils } from 'ethers';

const CKB_LAYER_1_DECIMALS = 8;
const CKB_LAYER_1_DECIMALS_MULTIPLIER = BigNumber.from(10).pow(CKB_LAYER_1_DECIMALS);

export function shannonsToDisplayValue(value: BigNumber) {
  return utils.formatUnits(value, CKB_LAYER_1_DECIMALS);
}

export function ckbToShannons(value: number) {
  return BigNumber.from(value).mul(CKB_LAYER_1_DECIMALS_MULTIPLIER);
}
