import { CSSProperties } from 'react';

export interface DAOTooltipProps {
  /**
   * Basic variants of the tooltip.
   */
  variant?: 'default' | 'success' | 'error';
  /**
   * Content of the tooltip.
   */
  message?: string | number | React.ReactElement;
  /**
   * Disable the default styles/class of the title content.
   */
  useDefaultMessageStyle?: boolean;
  /**
   * Determines if the tooltip is shown.
   */
  open?: boolean;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   */
  closeDelay?: number;
  /**
   * Adds an arrow to the tooltip.
   */
  hideArrow?: boolean;
  /**
   * Tooltip placement.
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  /**
   * The duration for the transition, in milliseconds when hiding the
   * tooltip.
   */
  fadeTimeout?: number;
  /**
   * The element above which the tooltip will display.
   */
  children?: React.ReactNode;
  /**
   * Background color of the tooltip.
   */
  backgroundColor?: string;
  /**
   * Color of the text within the title.
   */
  textColor?: string;
  /**
   * Custom styles of the tooltip.
   */
  tooltipStyles?: CSSProperties;
  /**
   * Custom styles of the tooltip.
   */
  arrowStyles?: CSSProperties;
  childrenStyles?: CSSProperties;
  /**
   * Show and hide tooltip. If shouldDisplayTooltip is set to false, return only children
   */
  shouldDisplayTooltip?: boolean;
}
