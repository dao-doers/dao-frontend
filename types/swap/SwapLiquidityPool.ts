/**
 * Option to select for swap (used for swap selectors)
 */
interface SwapLiquidityPool {
  /**
   * Token or liquidity name
   */
  name: string;

  /**
   * Token or liquidity icon URL
   *
   * @example "https://api.ysl.io/icons/tokens/busd.svg"
   */
  icon: string;

  /**
   * Coin or liquidity pool address
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc"
   */
  address: string;

  /**
   * Swap client
   *
   * @example "ApeSwap"
   */
  swapClient: string;
}

export default SwapLiquidityPool;
