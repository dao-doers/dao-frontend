import BigNumber from 'bignumber.js';
import numbro from 'numbro';

const getBalanceLabel = (quantity: number, decimals: number) => {
  const zeroes = !decimals ? 0 : Number(decimals);

  return numbro(new BigNumber(quantity).dividedBy(10 ** zeroes).toNumber()).format('0,0.[00]');
};

export default getBalanceLabel;
