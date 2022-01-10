/**
 * Information about blockchain contract with is address, chainId and ABI
 */
interface Contract {
  /**
   * Address of that contract
   *
   * @example "0xb20587dBBF4CbeAA9dBC1CFd56aea13ea382e547"
   */
  address: string;

  /**
   * Id of the chain this contract was deployed on
   *
   * @example "54"
   */
  chainId: string;

  /**
   * Contract's ABI
   */
  abi: object;
}

export default Contract;
