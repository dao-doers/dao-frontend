import { useHooks } from "../../providers/web3"

export const useAccount = () => {
  return useHooks(hooks => hooks.useAccount)()
}

export const useBlock = () => {
  return useHooks(hooks => hooks.useBlock)()
}
