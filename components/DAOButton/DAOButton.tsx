import React, { FC, forwardRef, ReactNode } from 'react';

import styled from '@emotion/styled';

import Button, { ButtonProps } from '@mui/material/Button';
import { css } from '@emotion/react';
import { Theme } from '@mui/system';

import Box from '@mui/material/Box';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';

type Variant = 'gradientOutline' | 'agreeVariant' | 'disagreeVariant' | 'default';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    default: true;
    gradientOutline: true;
    agreeVariant: true;
    disagreeVariant: true;
  }
}

export interface DAOButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: ButtonProps['variant'] | Variant;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const sizeStyles = ({ size }: DAOButtonProps) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px;
        font-weight: 600;
        font-size: 13px;
        line-height: 19px;
      `;
    case 'large':
      return css`
        padding: 10.5px 16px;
        font-size: 16px;
        line-height: 26px;
      `;
    default:
      return css`
        padding: 8px 12px;
        font-size: 14px;
        line-height: 21px;
      `;
  }
};

const borderVariantStyles = ({ theme, variant }: DAOButtonProps & { theme: Theme }) => {
  const { basic, hover, disabled } = theme.palette.buttons[variant ?? 'default'];

  return css`
    background: ${basic.border};

    &:hover {
      background: ${hover.border};
    }

    &:disabled {
      background: ${disabled.border};
    }
  `;
};

const innerVariantStyles = ({ theme, variant }: DAOButtonProps & { theme: Theme }) => {
  const { basic, hover, disabled } = theme.palette.buttons[variant ?? 'default'];

  return css`
    background: ${basic.background};
    color: ${basic.text};

    &:hover {
      background: ${hover.background};
      color: ${hover.text};
    }

    &:disabled {
      background: ${disabled.background};
      color: ${disabled.text};
    }
  `;
};

const StyledDAOButton = styled(Button)<DAOButtonProps>`
  ${borderVariantStyles};
  width: 100%;
  height: 100%;
  min-width: 0;
  font-weight: 600;
  text-transform: none;
  padding: 2px;
  border-radius: 9px;
  transition: background 250ms ease-in-out;
`;

const InnerButton = styled.div<DAOButtonProps>`
  ${innerVariantStyles};
  ${sizeStyles};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  transition: background 250ms ease-in-out;
`;

const DAOButton: FC<DAOButtonProps> = forwardRef((props, ref) => {
  const { children, variant, size, fullWidth, disabled, isLoading, ...rest } = props;

  return (
    <StyledDAOButton variant={variant} size={size} fullWidth={fullWidth} disabled={disabled} {...rest} ref={ref}>
      <InnerButton variant={variant} size={size} fullWidth={fullWidth}>
        {isLoading ? (
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" mr={2}>
              <DAOCircleLoader size={20} />
            </Box>
            Processing...
          </Box>
        ) : (
          children
        )}
      </InnerButton>
    </StyledDAOButton>
  );
});

export default DAOButton;
