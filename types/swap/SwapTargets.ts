/**
 * Swap source and target for swap
 */
interface SwapTargets {
  /**
   * Token or LP address to swap value from.
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc"
   */
  sourceCoinAddress: string;

  /**
   * Token or LP address to swap value to.
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc"
   */
  targetCoinAddress: string;
}

export default SwapTargets;
