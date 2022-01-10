import { FC, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { secondsToHours } from 'utils/formatDate';

export type CounterProps = {
  time: number;
  position?: 'center' | 'flex-start' | 'flex-end';
};

const Counter: FC<CounterProps> = ({ time, position = 'flex-end' }) => {
  const remainingTime = +new Date(time) - +new Date() / 1000;
  const [counter, setCounter] = useState<number>(remainingTime);

  useEffect(() => {
    if (counter <= 0) {
      setCounter(0);
    }

    if (counter > 0) {
      const timer: ReturnType<typeof setInterval> = setInterval(() => setCounter(counter - 1), 1000);

      return () => clearInterval(timer);
    }

    return () => {};
  }, [counter]);

  const { hours, minutes, seconds } = secondsToHours(counter);

  return (
    <Box display="flex" justifyContent={position} alignItems="center" width="100%">
      <Typography align="center">
        <b>
          {hours} h {minutes} m {parseInt(seconds, 10)} s
        </b>
      </Typography>
    </Box>
  );
};

export default Counter;
