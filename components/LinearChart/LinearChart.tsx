import { FC } from 'react';

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const AgreeLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.colors.main6,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.colors.col2,
  },
}));

const DisagreeLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.colors.main6,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.colors.col4,
  },
}));

interface LinearChartProps {
  main: number;
  all: number;
  type: 'agree' | 'disagree';
}

const LinearChart: FC<LinearChartProps> = ({ main, all, type }) => {
  return (
    <Box>
      {type === 'agree' && <AgreeLinearProgress variant="determinate" value={(main / all) * 100} />}
      {type === 'disagree' && <DisagreeLinearProgress variant="determinate" value={(main / all) * 100} />}
    </Box>
  );
};

export default LinearChart;
