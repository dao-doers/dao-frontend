/**
 * Swap parameters used for getting swap estimated information and possibly on performing the actual swap.
 */
interface SwapParameters {
  /**
   * Gas price in gwei
   *
   * @example "20"
   */
  gasPrice: number;

  /**
   * Slippage tolerance in percentage
   *
   * @example "2.04"
   */
  slippageTolerance: number;
}

export default SwapParameters;
