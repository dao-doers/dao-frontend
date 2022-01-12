import { useHooks } from "../../providers/web3"

const _isEmpty = data => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  )
}


const enhanceHook = swrRes => {
  const { data, error } = swrRes
  const hasInitialResponse = !!(data || error)
  const isEmpty = hasInitialResponse && _isEmpty(data)

  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse
  }
}


export const useAccount = () => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useAccount)())
  return {
    account: swrRes
  }
}

export const useBlock = () => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useBlock)())
    return {
      block: swrRes
    }
}
