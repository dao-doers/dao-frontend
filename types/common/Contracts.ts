import Contract from './Contract';

/**
 * List of contracts used in YSL project
 *
 * This is not a full list yet! Probably...
 */
interface Contracts {
  /**
   * Contracts used for using YSL protocol (I think)
   */
  protocol: Contract;

  /**
   * Contract used for referrals
   */
  referral: Contract;

  /**
   * Base ERC20 contract used for deposits, withdrawals etc.
   */
  erc20: Contract;
  // Possibly others?
}

export default Contracts;
