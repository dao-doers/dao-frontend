import { FC } from 'react';

import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface DAOCircleLoaderProps {
  size?: number;
}

const useStyles = makeStyles(() => ({
  circle: {
    stroke: 'url(#linearColors)',
  },
}));

const DAOCircleLoader: FC<DAOCircleLoaderProps> = ({ size = 135 }) => {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <>
      <svg width="1" height="1">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor={theme.palette.colors.col1} />
          <stop offset="90%" stopColor={theme.palette.colors.col2} />
        </linearGradient>
      </svg>
      <Box display="flex" justifyContent="center" width="100%">
        <CircularProgress size={size} thickness={4} classes={{ circle: classes.circle }} />
      </Box>
    </>
  );
};

export default DAOCircleLoader;
