import SwapMain from './SwapMain';
import SwapPlatform from './SwapPlatform';
import SwapCharts from './SwapCharts';

/**
 * Swap information for given swap configuration
 */
interface SwapInfo {
  /**
   * Prices information for the transaction
   */
  swapParams: SwapMain;

  /**
   * List of swap options for transactions
   */
  swapPlatforms: SwapPlatform[];

  /**
   * Charts for given swap config
   */
  charts: SwapCharts;
}

export default SwapInfo;
