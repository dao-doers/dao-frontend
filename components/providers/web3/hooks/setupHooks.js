import { handler as createUseAccount } from "./useAccount";
import { handler as createUseBlock } from "./useBlock";


export const setupHooks = web3 => {
  return {
    useAccount: createUseAccount(web3),
    useBlock: createUseBlock(web3)
  }
}