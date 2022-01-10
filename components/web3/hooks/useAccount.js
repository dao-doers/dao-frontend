import { useHooks } from "../../providers/web3"

export const useAccount = () => {
    return useHooks(hooks => hooks.useAccount)()
  }