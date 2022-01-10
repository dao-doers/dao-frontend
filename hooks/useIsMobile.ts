import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useIsMobile = (size: Breakpoint = 'md') => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(size));
};

export default useIsMobile;
