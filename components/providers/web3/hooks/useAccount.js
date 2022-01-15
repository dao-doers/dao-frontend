import { AddressTranslator } from "nervos-godwoken-integration";
import { useEffect, useState } from "react"

export const handler = web3 => () => {
  let polyjuiceAccount;
  let ethAccount;

  const [ethAddress, setEthAddress] = useState(undefined)
  const [polyjuiceAddress, setPolyjuiceAddress] = useState(undefined);

  useEffect(() => {
    const getAccount = async () => {
      ethAccount = await web3.eth.getAccounts() // for ETH network
      setEthAddress(ethAccount[0])
      if (ethAccount[0]) {
      const addressTranslator = new AddressTranslator();
      polyjuiceAccount = await addressTranslator.ethAddressToGodwokenShortAddress(ethAccount[0])
      } else {
        setEthAddress(undefined)
      }
      setPolyjuiceAddress(polyjuiceAccount)
    }

    web3 && getAccount()
  }, [web3])

  useEffect(() => {
    window.ethereum && 
    window.ethereum.on("accountsChanged", 
      accounts => setEthAddress(accounts[0] ?? null)
    )
  }, [])

  return { ethAddress, polyjuiceAddress}
}
