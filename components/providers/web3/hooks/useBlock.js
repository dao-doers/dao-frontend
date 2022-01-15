import { useEffect, useState } from "react";
import { useInterval } from 'hooks/useInterval';
import { config } from '/config/config.ts';
import PolyjuiceHttpProvider from "@polyjuice-provider/web3";
import Web3 from "web3";

const godwokenRpcUrl = config.WEB3_PROVIDER_URL;

const providerConfig = {
  web3Url: godwokenRpcUrl
  };

const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
if (typeof window !== 'undefined') {
  web3 = new Web3(provider);
}

export const handler = () => () => {
  const [block, setBlock] = useState(null)

  // useEffect(() => {
    useInterval(() =>           {
    const getBlock = async () => {
      const blocks = await web3.eth.getBlockNumber()
      setBlock(blocks)

      if (!blocks) {
          throw new Error("Cannot retreive block. Please refresh the browser.")
      }
      return blocks
    }
    
    getBlock()
    
  // }, [])
}, 10 * 3000);
  return { block }
}