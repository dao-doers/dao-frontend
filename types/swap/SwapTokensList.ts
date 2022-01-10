import SwapToken from './SwapToken';
import SwapLiquidityPool from './SwapLiquidityPool';

/**
 * List of availible tokens and liquidity pools
 */
interface SwapTokensList {
  /**
   * List of tokens to swap
   */
  tokens: SwapToken[];

  /**
   * List of liquidity pools to swap
   */
  liquidityPools: SwapLiquidityPool[];
}

export default SwapTokensList;
