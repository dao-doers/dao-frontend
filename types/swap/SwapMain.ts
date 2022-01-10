/**
 * Option to select for swap (used for swap selectors)
 */
interface SwapMain {
  /**
   * Source coin to swap
   *
   * @example "BUSD"
   */
  sourceCoin: string;

  /**
   * Source coin address
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc"
   */
  sourceCoinAddress: string;

  /**
   * Target coin of swap
   *
   * @example "BUSD"
   */
  targetCoin: string;

  /**
   * Target coin address
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc"
   */
  targetCoinAddress: string;

  /**
   * Icon link
   *
   */
  icon: string;

  /**
   * Amount of sourceCoins needed to get 1 targetCoin
   *
   * @example 1.088
   */
  exchangeRate: number;

  /**
   * The difference of the exchange rate over a certain data range
   *
   * @example 4.15
   */
  exchangeRateDiff: number;

  /**
   * The difference of the exchange rate over a certain data range, shown as a percentage
   *
   * @example 1.12
   */
  exchangeRateDiffPercentage: number;

  /**
   * Type of swap option
   */
  dataRange: 'last24h' | 'lastWeek' | 'lastMonth';

  /**
   * sYSL Exit fee of this transaction in percentage
   *
   * @example 1.12
   */
  sYSLExitFee: string | null;

  /**
   * Exchange fee in sourceCoin
   *
   * @example 1.12
   */
  exchangeFeeValue: number;

  /**
   * Price impact
   *
   * @example 0.012
   */
  priceImpact: number;

  /**
   * Minimum received amount after swap.
   *
   * @example 0.0001
   */
  minimumReceiveValue: number;
}

export default SwapMain;
