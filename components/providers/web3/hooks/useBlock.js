import useSWR from "swr"

export const handler = web3 => () => {
const {data, ...rest } = useSWR(() => {
  return web3 ? "web3/block" : null },
  async () => {
    const blocks = await web3.eth.getBlockNumber()

    if (!blocks) {
        throw new Error("Cannot retreive block. Please refresh the browser.")
    }
    return blocks
  }
)

  return { block: {
    data,
    ...rest
  } }
}