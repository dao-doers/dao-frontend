/* eslint react/no-unused-prop-types: 0 */
import React from 'react';

interface Props {
  /**
   * @param children Group options, SelectorOptions objects.
   */
  children: React.ReactNode;
  /**
   * @param label Group label.
   */
  label: string;
}

const SelectorGroup = (props: Props): JSX.Element => {
  return <span>{props.children}</span>;
};

export default SelectorGroup;
