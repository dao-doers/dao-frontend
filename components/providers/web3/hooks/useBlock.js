import { useState } from "react";
import { useInterval } from 'hooks/useInterval';
import { config } from '/config/config.ts';
import PolyjuiceHttpProvider from "@polyjuice-provider/web3";
import Web3 from "web3";

const godwokenRpcUrl = config.WEB3_PROVIDER_URL;

const providerConfig = {
  web3Url: godwokenRpcUrl
  };
  
  export const handler = () => () => {
    let web3
    const [block, setBlock] = useState(null)
    const [loading, setLoading] = useState(false)

    const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
    web3 = new Web3(provider);
    
    useInterval(() => {
      const getBlock = async () => {
        const blocks = await web3.eth.getBlockNumber()
        setBlock(blocks)
        setLoading(true)
        if (!blocks) {
            throw new Error("Cannot retreive block. Please refresh the browser.")
        }
        return blocks
      }
      
      getBlock()
    }, 1 * 3000);

  return { block, loading }
}