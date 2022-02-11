/* eslint-disable eqeqeq */
import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styled from '@emotion/styled';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ChartProps {
  agreed: number;
  disagreed: number;
}

const CircleBox = styled(Box)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors.main5};
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin: auto;
`;

const Chart: FC<ChartProps> = ({ agreed, disagreed }) => {
  const theme = useTheme();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data2 = {
    datasets: [
      {
        data: [agreed, disagreed],
        backgroundColor: [theme.palette.colors.col2, theme.palette.colors.col1],
        borderWidth: 0,
        cutout: '55%',
      },
    ],
    options: {},
  };

  return (
    <Box>
      {agreed == 0 && disagreed == 0 ? (
        <CircleBox>
          <Typography align="center" width="100%">
            No votes yet
          </Typography>
        </CircleBox>
      ) : (
        <Doughnut data={data2} />
      )}
    </Box>
  );
};

export default Chart;
