import { Fade, Tooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import React from 'react';
import { TooltipMessageText } from './DAOTooltip.styles';
import { DAOTooltipProps } from './types';

const DAOTooltip = ({
  variant = 'default',
  message = 'message',
  useDefaultMessageStyle = true,
  open,
  closeDelay,
  hideArrow = false,
  placement = 'top',
  fadeTimeout = 180,
  children,
  backgroundColor = '#2EA5E8',
  textColor = '#e8e8e8',
  tooltipStyles,
  arrowStyles,
  childrenStyles = {},
  shouldDisplayTooltip = true,
  ...props
}: DAOTooltipProps): any => {
  const textCol = textColor;
  const tooltipTitle = <TooltipMessageText>{message}</TooltipMessageText>;
  let backgroundCol = backgroundColor;
  let position = '20px 0';

  if (variant === 'success') {
    backgroundCol = '#00D395';
  }

  if (variant === 'error') {
    backgroundCol = 'FE003E';
  }

  if (placement.includes('left') || placement.includes('right')) {
    position = '0 20px';
  }

  const styles: any = {
    tooltip: {
      backgroundColor: backgroundCol,
      color: textCol,
      fontSize: '10px',
      minHeight: '13px',
      padding: '4px 18px',
      margin: position,
      ...tooltipStyles,
    },
    arrow: {
      color: backgroundCol,
      ...arrowStyles,
    },
  };

  const CustomTooltip = withStyles(styles)(Tooltip);

  return shouldDisplayTooltip ? (
    <CustomTooltip
      title={useDefaultMessageStyle ? tooltipTitle : message}
      placement={placement}
      open={open}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: fadeTimeout }}
      leaveDelay={closeDelay}
      arrow={!hideArrow}
      {...props}
    >
      <div style={childrenStyles}>{children}</div>
    </CustomTooltip>
  ) : (
    children
  );
};

export default DAOTooltip;
