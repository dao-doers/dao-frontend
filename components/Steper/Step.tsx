/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

interface Props {
  children: React.ReactNode;
  label: string | React.ReactNode;
  defaultIcon?: JSX.Element;
  activeIcon?: JSX.Element;
  completeIcon?: JSX.Element;
  optional?: boolean;
  placeholder?: boolean;
}

export default function Step(props: Props): JSX.Element {
  return <div>{props.children}</div>;
}
