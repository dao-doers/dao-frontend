import { useEffect } from "react"
import useSWR from "swr"

export const handler = web3 => () => {
const {data, mutate, ...rest } = useSWR(() => {
  return web3 ? "web3/accounts" : null },
  async () => {
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  }
)

  useEffect(() => {
    window.ethereum && 
    window.ethereum.on("accountsChanged", 
      accounts => mutate(accounts[0] ?? null)
    )
  }, [])

  return {
    data,
    mutate,
    ...rest
  }
}