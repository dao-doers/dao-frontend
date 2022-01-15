import { useEffect, useState } from "react";
import { useInterval } from 'hooks/useInterval';

export const handler = web3 => () => {
  const [block, setBlock] = useState(null)

  useInterval(() => {
  // useEffect(() => {
    const getBlock = async () => {
      const blocks = await web3.eth.getBlockNumber()
      setBlock(blocks)

      if (!blocks) {
          throw new Error("Cannot retreive block. Please refresh the browser.")
      }
      return blocks
    }
    
    web3 && getBlock()
    
  // }, [web3])
}, 10 * 3000);
  return { block }
}