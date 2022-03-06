import { FC } from 'react';

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.colors.col1,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.colors.col2,
  },
}));

interface LinearChartProps {
  agreed: number;
  disagreed: number;
}

const LinearChart: FC<LinearChartProps> = ({ agreed, disagreed }) => {
  return <BorderLinearProgress variant="determinate" value={(agreed / (agreed + disagreed)) * 100} />;
};

export default LinearChart;
