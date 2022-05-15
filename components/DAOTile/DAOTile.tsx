import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Theme } from '@mui/system';

interface TileVariantProps {
  variant?: 'gradientOutline' | 'greyShadow' | 'successBox' | 'errorBox' | null;
  theme: Theme;
}

export type DAOTileProps = {
  children: ReactElement;
  variant?: 'gradientOutline' | 'greyShadow' | 'successBox' | 'errorBox' | null;
  width?: string;
  height?: string;
};

const tileVariant = ({ theme, variant }: TileVariantProps & { theme: Theme }) => {
  switch (variant) {
    case 'gradientOutline':
      return css`
        background: ${theme.palette.gradients.grad2};
        padding: 1px;
        border-radius: 20px;
      `;
    case 'greyShadow':
      return css`
        background: ${theme.palette.colors.main4};
        padding: 1px;
        border-radius: 20px;
      `;
    case 'successBox':
      return css`
        background: ${theme.palette.colors.col2};
        padding: 1px;
        border-radius: 20px;
      `;
    case 'errorBox':
      return css`
        background: ${theme.palette.colors.col4};
        padding: 1px;
        border-radius: 20px;
      `;
    default:
      return css`
        background: ${theme.palette.colors.main6};
        padding: 1px;
        border-radius: 20px;
      `;
  }
};

const innerTileVariant = ({ theme, variant }: TileVariantProps & { theme: Theme }) => {
  switch (variant) {
    case 'gradientOutline':
      return css`
        background-color: ${theme.palette.colors.main1};
        border-radius: 18px;
      `;
    case 'greyShadow':
      return css`
        /* background-color: 'transparent'; */
        background-color: ${theme.palette.colors.main1};
        border-radius: 0px;
      `;
    case 'successBox':
      return css`
        background-color: ${theme.palette.colors.main1};
        color: ${theme.palette.colors.col2};
        border-radius: 18px;
      `;
    case 'errorBox':
      return css`
        background-color: ${theme.palette.colors.main1};
        color: ${theme.palette.colors.col4};
        border-radius: 18px;
      `;
    default:
      return css`
        background-color: ${theme.palette.colors.main2};
        border-radius: 18px;
      `;
  }
};

const Tile = styled.div<DAOTileProps>`
  ${tileVariant};
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
`;

const InnerTile = styled.div<DAOTileProps>`
  ${innerTileVariant};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DAOTile: FC<DAOTileProps> = ({ children, variant, width, height }) => {
  return (
    <Tile variant={variant} width={width} height={height}>
      <InnerTile variant={variant}>{children}</InnerTile>
    </Tile>
  );
};

export default DAOTile;
