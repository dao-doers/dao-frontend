import { ChangeTrackingChartDataPoint, DateKeyChartDataPoint } from '../common/ChartCommons';

/**
 * Data point for swap chart
 */
interface SwapDataPoint extends DateKeyChartDataPoint, ChangeTrackingChartDataPoint {
  /**
   * Value of swap data point to show on the chart.
   *
   * @example "12.12" | "11.12"
   */
  value: string;
}

/**
 * All charts required by swap page (24h, week and month)
 */
interface SwapCharts {
  /**
   * Data for last 24 hours swap value chart
   */
  last24h: SwapDataPoint[];
  /**
   * Data for last week swap value chart
   */
  lastWeek: SwapDataPoint[];
  /**
   * Data for last month swap value chart
   */
  lastMonth: SwapDataPoint[];
}

export default SwapCharts;
