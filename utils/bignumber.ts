import BigNumber from 'bignumber.js';

export const bigNumberToString = value => {
  return new BigNumber(value).toString();
};

export const bigNumberSubtract = (value, subtractValue) => {
  return new BigNumber(value).minus(subtractValue).abs().toString();
};

export const convertFromCogs = (cogs, decimals) => {
  return new BigNumber(cogs).dividedBy(10 ** decimals).toString();
};

export const isValueGreaterThanProvided = (value, providedValue) => {
  return new BigNumber(value).gt(providedValue);
};

export const isValueLessThanProvided = (value, providedValue) => {
  return new BigNumber(value).lt(providedValue);
};

export const convertToValueFromPercentage = (value, percentage) => {
  return new BigNumber(value).times(percentage).dividedBy(100).toString();
};

export const convertToCogs = (amount, decimals) => {
  return new BigNumber(amount).times(10 ** decimals).toFixed();
};