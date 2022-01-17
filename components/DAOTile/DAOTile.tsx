import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Theme } from '@mui/system';

import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

interface TileVariantProps {
  variant?:
    | DAO_TILE_VARIANTS.GRADIENT_OUTLINE
    | DAO_TILE_VARIANTS.GREY_OUTLINE
    | DAO_TILE_VARIANTS.RED_OUTLINE
    | DAO_TILE_VARIANTS.GREY_SHADOW
    | DAO_TILE_VARIANTS.BLUE_BACKGROUND
    | DAO_TILE_VARIANTS.GREEN_BACKGROUND
    | DAO_TILE_VARIANTS.RED_BACKGROUND
    | DAO_TILE_VARIANTS.YELLOW_BACKGROUND
    | null;
  theme: Theme;
}

export type DAOTileProps = {
  children: ReactElement;
  variant?:
    | DAO_TILE_VARIANTS.GRADIENT_OUTLINE
    | DAO_TILE_VARIANTS.GREY_OUTLINE
    | DAO_TILE_VARIANTS.RED_OUTLINE
    | DAO_TILE_VARIANTS.GREY_SHADOW
    | DAO_TILE_VARIANTS.BLUE_BACKGROUND
    | DAO_TILE_VARIANTS.GREEN_BACKGROUND
    | DAO_TILE_VARIANTS.RED_BACKGROUND
    | DAO_TILE_VARIANTS.YELLOW_BACKGROUND
    | null;
  width?: string;
  height?: string;
};

const tileVariant = ({ theme, variant }: TileVariantProps & { theme: Theme }) => {
  switch (variant) {
    case DAO_TILE_VARIANTS.GRADIENT_OUTLINE:
      return css`
        background: ${theme.palette.gradients.grad2};
        padding: 2px;
      `;
    case DAO_TILE_VARIANTS.GREY_OUTLINE:
      return css`
        background: ${theme.palette.colors.main6};
        padding: 2px;
      `;
    case DAO_TILE_VARIANTS.RED_OUTLINE:
      return css`
        background: ${theme.palette.colors.col6};
        padding: 1px;
      `;
    case DAO_TILE_VARIANTS.GREY_SHADOW:
      return css`
        box-shadow: 0px 0px 24px 0px ${theme.palette.colors.main8};
      `;
    case DAO_TILE_VARIANTS.BLUE_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col1};
        padding: 2px;
      `;
    case DAO_TILE_VARIANTS.GREEN_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col2};
        padding: 2px;
      `;
    case DAO_TILE_VARIANTS.RED_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col6};
        padding: 2px;
      `;
    case DAO_TILE_VARIANTS.YELLOW_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col4};
        padding: 2px;
      `;
    default:
      return css`
        background: ${theme.palette.colors.main4};
        padding: 1px;
      `;
  }
};

const innerTileVariant = ({ theme, variant }: TileVariantProps & { theme: Theme }) => {
  switch (variant) {
    case DAO_TILE_VARIANTS.GRADIENT_OUTLINE:
      return css`
        background-color: ${theme.palette.colors.main1};
      `;
    case DAO_TILE_VARIANTS.GREY_OUTLINE:
      return css`
        background-color: ${theme.palette.colors.main2};
      `;
    case DAO_TILE_VARIANTS.RED_OUTLINE:
      return css`
        background-color: ${theme.palette.colors.main1};
      `;
    case DAO_TILE_VARIANTS.GREY_SHADOW:
      return css`
        background-color: 'transparent';
      `;
    case DAO_TILE_VARIANTS.BLUE_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col1};
        color: ${theme.palette.colors.main1};
      `;
    case DAO_TILE_VARIANTS.GREEN_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col2};
        color: ${theme.palette.colors.main1};
      `;
    case DAO_TILE_VARIANTS.RED_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col6};
        color: ${theme.palette.colors.main1};
      `;
    case DAO_TILE_VARIANTS.YELLOW_BACKGROUND:
      return css`
        background: ${theme.palette.colors.col4};
        color: ${theme.palette.colors.main1};
      `;
    default:
      return css`
        background-color: ${theme.palette.colors.main4};
      `;
  }
};

const Tile = styled.div<DAOTileProps>`
  ${tileVariant};
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  border-radius: 10px;
`;

const InnerTile = styled.div<DAOTileProps>`
  ${innerTileVariant};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
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
