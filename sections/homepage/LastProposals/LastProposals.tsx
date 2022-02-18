import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import ProposalTile from 'sections/proposalsPage/ProposalTile/ProposalTile';

import { selectSortedProposalsArray } from 'redux/slices/proposals';

import useIsMobile from 'hooks/useIsMobile';

import 'swiper/css';
import 'swiper/css/pagination';
import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import Overlay from 'components/Overlay/Overlay';

const params = {
  grabCursor: true,
};

const StyledSwiper = styled(Swiper)`
  .swiper-pagination {
    bottom: 0;
    top: auto;
  }

  .swiper-pagination-progressbar-fill {
    background-color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const LastProposals: FC = () => {
  const isMobile = useIsMobile('md');

  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const { molochLoading } = useCheckIndexerStatus();
  return (
    <Box width="100%">
      <TypographyBold variant="h3" mb={3} mt={8}>
        Last Proposals
      </TypographyBold>

      {sortedProposalsArray.length === 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledPlaylistRemoveIcon />
          <TypographyBlue>There are no proposals of selected type</TypographyBlue>
        </Box>
      )}
      <Overlay show={molochLoading}>
        {sortedProposalsArray.length > 0 && (
          <>
            {!isMobile && (
              <>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Box width="49%">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[0].proposalId}`}
                      id={`proposal-${sortedProposalsArray[0].proposalId}`}
                      proposal={sortedProposalsArray[0]}
                    />
                  </Box>
                  <Box width="49%">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[1].proposalId}`}
                      id={`proposal-${sortedProposalsArray[1].proposalId}`}
                      proposal={sortedProposalsArray[1]}
                    />
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" width="100%">
                  <Box width="49%">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[2].proposalId}`}
                      id={`proposal-${sortedProposalsArray[2].proposalId}`}
                      proposal={sortedProposalsArray[2]}
                    />
                  </Box>
                  <Box width="49%">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[3].proposalId}`}
                      id={`proposal-${sortedProposalsArray[3].proposalId}`}
                      proposal={sortedProposalsArray[3]}
                    />
                  </Box>
                </Box>
              </>
            )}

            {isMobile && (
              <StyledSwiper modules={[Pagination]} pagination={{ type: 'progressbar' }} {...params}>
                <SwiperSlide>
                  <Box width="90%" mx="auto">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[0].proposalId}`}
                      id={`proposal-${sortedProposalsArray[0].proposalId}`}
                      proposal={sortedProposalsArray[0]}
                    />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box width="90%" mx="auto">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[1].proposalId}`}
                      id={`proposal-${sortedProposalsArray[1].proposalId}`}
                      proposal={sortedProposalsArray[1]}
                    />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box width="90%" mx="auto">
                    <ProposalTile
                      key={`proposal-${sortedProposalsArray[2].proposalId}`}
                      id={`proposal-${sortedProposalsArray[2].proposalId}`}
                      proposal={sortedProposalsArray[2]}
                    />
                  </Box>
                </SwiperSlide>
              </StyledSwiper>
            )}
          </>
        )}
      </Overlay>
    </Box>
  );
};

export default LastProposals;
