import { BridgedToken, Token } from 'interfaces/data';

export enum CanonicalTokenSymbol {
  ETH = 'ETH',
  CKB = 'CKB',
  dCKB = 'dCKB',
}

export interface TokenDescriptor {
  address: string;
  symbol: string;
  decimals: number;
}

export type TokenDescriptorsRegistry = {
  [key in CanonicalTokenSymbol]?: TokenDescriptor;
};

export type BridgedTokensRegistry = {
  [key in CanonicalTokenSymbol]?: BridgedToken;
};
export type TokensRegistry = {
  [key in CanonicalTokenSymbol]?: Token;
};
