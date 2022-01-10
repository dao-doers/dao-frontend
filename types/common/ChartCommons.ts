/**
 * Common chart data point key as date in ISO-8601 format
 */
export interface DateKeyChartDataPoint {
  /**
   * Full date and time with timezone in ISO-8601 format below:
   * YYYY-MM-DDThh:mm:ssTZD
   *
   * IMPORTANT: Keep the time zone as saved as in timestamp in original measurement. If it was recording int UTC timestamps, provide UTC timestamps.
   * We will convert this date to user's current time zone on the frontend!
   *
   * @see https://www.w3.org/TR/NOTE-datetime
   *
   * @example "1994-11-05T13:15:30Z"
   */
  key: string;
}

/**
 * Data point with previous point values
 */
export interface ChangeTrackingChartDataPoint {
  /**
   * Change in USD since last data point
   *
   * @example 330.00
   */
  changeSincePreviousUSD: number;

  /**
   * Change in percentage since last data point
   *
   * @example 4.21
   */
  changePercentage: number;
}
