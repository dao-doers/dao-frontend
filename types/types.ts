import PROPOSAL_STATUS from 'enums/proposalStatus';
import { BigNumber } from 'ethers';

export interface Proposal {
  applicant: string;
  cancelled: boolean;
  createdAt: string;
  didPass: boolean;
  details: string;
  guildkick: boolean;
  id: string;
  lootRequested: number;
  paymentRequested: number;
  paymentTokenSymbol: string;
  proposalId: string;
  proposalStatus: PROPOSAL_STATUS;
  proposer: string;
  sponsor: string;
  sponsored: boolean;
  sharesRequested: number;
  tributeToken: string;
  tributeOffered: BigNumber;
  tributeTokenSymbol: string;
  yesVotes: number;
  noVotes: number;
  proposalIndex: string | null;
  votingPeriodStarts: string;
  votingPeriodEnds: string;
  gracePeriodEnds: string;
}
