interface ChainConfig {
  chainId: {
    hex: string;
    dec: number;
  };
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}

const chainConfig: ChainConfig = {
  chainId: {
    hex: String(process.env.APP_CHAIN_ID),
    dec: Number.parseInt(String(process.env.APP_CHAIN_ID), 16),
  },
  chainName: String(process.env.APP_CHAIN_NAME),
  nativeCurrency: {
    name: String(process.env.APP_CHAIN_NATIVE_CURRENCY_NAME),
    symbol: String(process.env.APP_CHAIN_NATIVE_CURRENCY_SYMBOL),
    decimals: Number(process.env.APP_CHAIN_NATIVE_CURRENCY_DECIMALS),
  },
  rpcUrls: [String(process.env.APP_CHAIN_RPC_URL)],
};

export default chainConfig;
