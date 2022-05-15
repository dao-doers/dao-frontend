import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import ProposalTile from 'components/ProposalTile/ProposalTile';

import useIsMobile from 'hooks/useIsMobile';

import { selectProposalsArray } from 'redux/slices/proposals';

import 'swiper/css';
import 'swiper/css/pagination';

const params = {
  grabCursor: true,
};

const StyledBox = styled(Box)``;

const StyledSwiper = styled(Swiper)`
  .swiper-pagination {
    bottom: 0;
    top: auto;
  }

  .swiper-pagination-progressbar-fill {
    background-color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 500;
`;

const LastProposals: FC = () => {
  const isMobile = useIsMobile('md');

  const proposalsArray = useSelector(selectProposalsArray);

  return (
    <Box mb={4}>
      <Typography variant="h3-bold" paragraph>
        Last Proposals
      </Typography>

      {proposalsArray.length === 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledPlaylistRemoveIcon />
          <TypographyBlue>There are no proposals of selected type</TypographyBlue>
        </Box>
      )}

      {proposalsArray.length > 0 && (
        <>
          {!isMobile && (
            <StyledBox>
              <Box display="flex" justifyContent="space-between" width="100%">
                {proposalsArray.slice(0, 2).map((proposal: any) => {
                  return (
                    <Box width="50%" key={`key-${proposal.proposalId}`}>
                      <ProposalTile
                        key={`proposal-${proposal.proposalId}`}
                        id={`proposal-${proposal.proposalId}`}
                        proposal={proposal}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                {proposalsArray.slice(2, 4).map((proposal: any) => {
                  return (
                    <Box width="50%" key={`key-${proposal.proposalId}`}>
                      <ProposalTile
                        key={`proposal-${proposal.proposalId}`}
                        id={`proposal-${proposal.proposalId}`}
                        proposal={proposal}
                      />
                    </Box>
                  );
                })}
              </Box>
            </StyledBox>
          )}

          {isMobile && (
            <StyledSwiper modules={[Pagination]} pagination={{ type: 'progressbar' }} {...params}>
              {proposalsArray.slice(0, 3).map((proposal: any) => {
                return (
                  <SwiperSlide>
                    <ProposalTile
                      key={`proposal-${proposal.proposalId}`}
                      id={`proposal-${proposal.proposalId}`}
                      proposal={proposal}
                    />
                  </SwiperSlide>
                );
              })}
            </StyledSwiper>
          )}
        </>
      )}
    </Box>
  );
};

export default LastProposals;
