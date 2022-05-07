import { FC } from 'react';

import { useTheme } from '@mui/system';

export type LoaderStatus = 'loading' | 'success' | 'error';

interface DAOCircleLoaderProps {
  size?: number;
  status?: LoaderStatus;
}

const PATHS = {
  BACKGROUND_RING:
    'M120.001 60.0003C120.001 93.1373 93.1379 120 60.0009 120C26.8639 120 0.00109863 93.1373 0.00109863 60.0003C0.00109863 26.8633 26.8639 0.000488281 60.0009 0.000488281C93.1379 0.000488281 120.001 26.8633 120.001 60.0003ZM9.60107 60.0003C9.60107 87.8354 32.1658 110.4 60.0009 110.4C87.836 110.4 110.401 87.8354 110.401 60.0003C110.401 32.1652 87.836 9.60046 60.0009 9.60046C32.1658 9.60046 9.60107 32.1652 9.60107 60.0003Z',
  FOREGROUND_RING:
    'M60.0002 120C93.1372 120 120 93.1368 120 59.9998C120 26.8628 93.1372 4.07114e-06 60.0002 2.62268e-06C26.8632 1.17421e-06 0.000365037 26.8628 0.000363588 59.9998C0.00036214 93.1368 26.8632 120 60.0002 120ZM60.0002 9.59997C87.8352 9.59998 110.4 32.1648 110.4 59.9998C110.4 87.8349 87.8352 110.4 60.0002 110.4C32.1651 110.4 9.60033 87.8349 9.60034 59.9998C9.60034 32.1648 32.1651 9.59997 60.0002 9.59997Z',
  SUCCESS_CHECK:
    'M51.02 80.0563L32.8201 61.8563C31.7266 60.7629 31.7266 58.9901 32.8201 57.8965L36.7798 53.9367C37.8732 52.8432 39.6461 52.8432 40.7396 53.9367L52.9999 66.197L79.2603 39.9368C80.3537 38.8433 82.1266 38.8433 83.2201 39.9368L87.1798 43.8966C88.2732 44.99 88.2732 46.7628 87.1798 47.8564L54.9798 80.0564C53.8863 81.1498 52.1134 81.1498 51.02 80.0563V80.0563Z',
  ERROR_CROSS:
    'M77.3476 34.843L60.6744 51.5123C60.3007 51.8859 59.6948 51.8859 59.3212 51.5122L42.6523 34.8434C41.5313 33.7223 39.7137 33.7223 38.5926 34.8434L34.8407 38.5953C33.7197 39.7164 33.7197 41.534 34.8407 42.655L51.5094 59.3237C51.8831 59.6974 51.8831 60.3032 51.5094 60.6769L34.8407 77.3456C33.7197 78.4667 33.7197 80.2843 34.8407 81.4053L38.5926 85.1572C39.7137 86.2783 41.5313 86.2783 42.6524 85.1572L59.3212 68.4884C59.6948 68.1147 60.3007 68.1147 60.6744 68.4883L77.3476 85.1576C78.4687 86.2785 80.2861 86.2784 81.4071 85.1574L85.1591 81.4053C86.2802 80.2843 86.2802 78.4667 85.1591 77.3456L68.4905 60.6769C68.1168 60.3032 68.1168 59.6974 68.4905 59.3237L85.1591 42.655C86.2802 41.534 86.2802 39.7164 85.1591 38.5953L81.4071 34.8432C80.2861 33.7223 78.4687 33.7222 77.3476 34.843Z',
  LOADER_ARC:
    'M20.9687 20.9699C19.0942 19.0953 19.0826 16.0395 21.1009 14.3208C28.2752 8.21144 36.8066 3.86246 46.0138 1.65526C56.781 -0.925879 68.0523 -0.477356 78.5803 2.95119C89.1082 6.37973 98.4822 12.6546 105.665 21.0811C111.806 28.2869 116.141 36.8257 118.342 45.9882C118.961 48.5659 117.152 51.0288 114.533 51.44C111.914 51.8512 109.48 50.053 108.822 47.4851C106.921 40.071 103.351 33.1655 98.3584 27.3085C92.3252 20.2302 84.4511 14.9593 75.6076 12.0793C66.7641 9.19937 57.2962 8.82261 48.2518 10.9908C40.768 12.7848 33.8157 16.2635 27.9134 21.1364C25.8692 22.8241 22.8433 22.8444 20.9687 20.9699Z',
};

const DAOCircleLoader: FC<DAOCircleLoaderProps> = ({ size = 135, status = 'loading' }) => {
  const theme = useTheme();

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={PATHS.BACKGROUND_RING} fill={theme.palette.colors.main2} />
      <path d={PATHS.FOREGROUND_RING} fill="url(#linearColors)" mask={status === 'loading' ? 'url(#mask)' : ''} />
      {status === 'success' && <path d={PATHS.SUCCESS_CHECK} fill="url(#linearColors)" />}
      {status === 'error' && <path d={PATHS.ERROR_CROSS} fill="url(#linearColors)" />}
      {status !== 'loading' && <path d={PATHS.FOREGROUND_RING} fill="url(#linearColors)" />}
      <defs>
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor={theme.palette.colors.col1} />
          <stop offset="90%" stopColor={theme.palette.colors.col5} />
        </linearGradient>
        <mask id="mask">
          <path d={PATHS.LOADER_ARC} fill="#fff">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 60 60"
              to="360 60 60"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </mask>
      </defs>
    </svg>
  );
};

export default DAOCircleLoader;
