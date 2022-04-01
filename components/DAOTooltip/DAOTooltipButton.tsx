import React from 'react';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import DAOTooltip from './DAOTooltip';

interface DAOTooltipButtonProps {
  /**
   * @param tooltipMessage - message to be shown on tooltip hover, focus or touch.
   */
  tooltipMessage?: string;
}
const DAOTooltipButton = React.memo(({ tooltipMessage }: DAOTooltipButtonProps) => {
  return (
    <DAOTooltip message={<span>{tooltipMessage}</span>} enterTouchDelay={300} leaveTouchDelay={1000}>
      <HelpOutlineRoundedIcon />
    </DAOTooltip>
  );
});

export default DAOTooltipButton;
