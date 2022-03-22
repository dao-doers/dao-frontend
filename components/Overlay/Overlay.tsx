/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box } from '@mui/system';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';

// TODO: do we need that component?

interface OverlayProps {
  show?: boolean;
  children?: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
  primaryText?: string;
  colorPrimaryText?: string;
  customComponent?: JSX.Element;
  disableCustomComponent?: boolean;
  disableOverlay?: boolean;
  opacityChildren?: string;
  blurChildren?: any;
}

const Overlay: React.FC<OverlayProps> = props => {
  const {
    show = false,
    primaryText = 'Loading...',
    colorPrimaryText = '#383838',
    disableCustomComponent = false,
    disableOverlay = true,
    overlayOpacity = 0.3,
    overlayColor = '#14171a',
    opacityChildren = '30%',
    blurChildren = 'blur(3px)',
  } = props;

  const defaultComponent = !disableCustomComponent && <DAOCircleLoader size={100} />;

  function hexToRgb(hex: string): any {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      };
    }
    return {};
  }

  let rgbOverlayColor: any = {};
  if (overlayColor) {
    rgbOverlayColor = hexToRgb(overlayColor);
  }

  return (
    <LoadingOverlay
      active={show}
      fadeSpeed={100}
      spinner={<Box justifyContent="center">{props.customComponent || defaultComponent}</Box>}
      text={
        <Box mt={2} justifyContent="center" style={{ color: colorPrimaryText }}>
          {primaryText}
        </Box>
      }
      styles={{
        overlay: (base: any) => ({
          ...base,
          backgroundColor: `rgba(
                ${rgbOverlayColor?.red},
                ${rgbOverlayColor?.green},
                ${rgbOverlayColor.blue},
                ${disableOverlay ? '0%' : overlayOpacity}
                )`,
        }),
      }}
    >
      <Box style={show ? { opacity: opacityChildren, filter: blurChildren } : {}}>{props.children}</Box>
    </LoadingOverlay>
  );
};

export default Overlay;
