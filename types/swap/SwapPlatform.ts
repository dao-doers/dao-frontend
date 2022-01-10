/**
 * Swap platform entry used as rows in the swap page table
 */
interface SwapPlatform {
  /**
   * Swap platform name
   */
  name: string;

  /**
   * Swap platform icon URL
   *
   * @example "https://api.ysl.io/icons/swaps/pancakeSwapV2.svg"
   */
  icon: string;

  /**
   * Exchange rate for given swap on that plaftorm
   *
   * @example 9.45803
   */
  exchangeRate: number;

  /**
   * Exchange rate difference in percentage in comparison to the best platform. Best platform gets "0.00"
   *
   * @example 0.00 | -0.07
   */
  exchangeRateDiff: number;
}

export default SwapPlatform;
