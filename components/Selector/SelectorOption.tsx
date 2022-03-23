/* eslint react/no-unused-prop-types: 0 */
import React from 'react';

/**
 * Properties of Selector's Option object
 */
interface Props {
  /**
   * @param children ReactElement to be displayed when Step is active
   */
  children: React.ReactElement;
  /**
   * @param disabled - If true, option is disabled.
   */
  disabled?: boolean | false;
  /**
   * @param icon - Option icon which is displayed on left side of option if Selector's `displayOptionIcon` prop is true, furthermore it's icon to replace
   * Selector's icon if `allowIconReplacing` prop is enabled.
   */
  icon?: any;
  /**
   * @param label - Label displayed in selector when option is chosen. Not needed if Selector's `displayLabelOnSelect` is set to true.
   */
  label?: string;
  /**
   * @param selected - String to be shown when option is selected (default is label).
   */
  selected?: string;
  /**
   * @param paymentNetwork - String needed to create new balance or change it.
   */
  paymentNetwork?: string;
  /**
   * @param value - Keyword/keywords that option can be found by in selector.
   */
  value: string;
}

const SelectorOption = (props: Props): JSX.Element => {
  return <span>{props.children}</span>;
};

export default SelectorOption;
