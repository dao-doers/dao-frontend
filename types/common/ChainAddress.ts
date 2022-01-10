/**
 * Address of a chain with its ID
 */
interface ChainAddress {
  /**
   * Chain ID
   *
   * @example "4" | "56"
   */
  chainId: string;

  /**
   * Chain address
   *
   * @example "0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc" | "0x8257CD546Bb7E6786cCE5b050e395bbf8E951717"
   */
  address: string;
}

export default ChainAddress;
