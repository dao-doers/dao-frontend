import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import VoteTile from 'sections/proposalsPage/VoteTile/VoteTile';

import { selectVotesArray } from 'redux/slices/votes';

import useIsMobile from 'hooks/useIsMobile';

import 'swiper/css';
import 'swiper/css/pagination';

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
  color: ${({ theme }) => theme.palette.colors.main7};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 600;
`;

const LastVotes: FC = () => {
  const isMobile = useIsMobile('md');

  const votesArray = useSelector(selectVotesArray);

  return (
    <Box width="100%">
      <TypographyBold variant="h3" mb={3} mt={8}>
        Last Votes
      </TypographyBold>

      {votesArray.length === 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledPlaylistRemoveIcon />
          <TypographyBlue>There are no votes yet</TypographyBlue>
        </Box>
      )}

      {votesArray.length > 0 && (
        <>
          {!isMobile && (
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box width="32%">
                <VoteTile key={`vote-${votesArray[0].id}`} vote={votesArray[0]} />
              </Box>
              <Box width="32%">
                <VoteTile key={`vote-${votesArray[1].id}`} vote={votesArray[1]} />
              </Box>
              <Box width="32%">
                <VoteTile key={`vote-${votesArray[2].id}`} vote={votesArray[2]} />
              </Box>
            </Box>
          )}

          {isMobile && (
            <StyledSwiper modules={[Pagination]} pagination={{ type: 'progressbar' }} {...params}>
              <SwiperSlide>
                <Box width="90%" mx="auto">
                  <VoteTile key={`vote-${votesArray[0].id}`} vote={votesArray[0]} />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box width="90%" mx="auto">
                  <VoteTile key={`vote-${votesArray[1].id}`} vote={votesArray[1]} />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box width="90%" mx="auto">
                  <VoteTile key={`vote-${votesArray[2].id}`} vote={votesArray[2]} />
                </Box>
              </SwiperSlide>
            </StyledSwiper>
          )}
        </>
      )}
    </Box>
  );
};

export default LastVotes;
