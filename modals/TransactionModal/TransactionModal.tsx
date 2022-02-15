import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Modal from 'components/Modal/Modal';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import DAOButton from 'components/DAOButton/DAOButton';

import { selectOpen, selectStatus, selectMessage, setClose } from 'redux/slices/modalTransaction';

import PROCESSING_STATUSES, { mapToLoader } from 'enums/processingStatuses';

const StyledBox = styled(Box)`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const TypographyGrey = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main6};
`;

const TransactionModal: FC = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectOpen);
  const status = useSelector(selectStatus);
  const message = useSelector(selectMessage);

  const handleTransactionModal = () => {
    if (status !== PROCESSING_STATUSES.PROCESSING) {
      dispatch(setClose());
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleTransactionModal}>
      <StyledBox>
        <Box mx="auto" mb={4}>
          <DAOCircleLoader status={mapToLoader(status)} />
        </Box>

        {status === PROCESSING_STATUSES.PROCESSING && (
          <>
            <Typography component="h5" variant="h5" align="center" paragraph>
              Processing transaction
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              It may take a while
            </TypographyGrey>
          </>
        )}

        {status === PROCESSING_STATUSES.SUCCESS && (
          <>
            <Typography component="h5" variant="h5" align="center" paragraph>
              Success
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              {message.length > 0 ? message : 'Your transaction has been processed by blockchain network'}
            </TypographyGrey>
            <Box width="210px" mx="auto" my={2}>
              <DAOButton variant="gradientOutline" onClick={handleTransactionModal}>
                CLOSE
              </DAOButton>
            </Box>
          </>
        )}

        {status === PROCESSING_STATUSES.ERROR && (
          <>
            <Typography component="h5" variant="h5" align="center" paragraph>
              {message.length > 0 ? message : 'Something went wrong'}
            </Typography>
            <TypographyGrey variant="subtitle2" align="center">
              {message.length === 0 ? 'Please try again' : ''}
            </TypographyGrey>
            <Box width="210px" mx="auto" my={2}>
              <DAOButton variant="gradientOutline" onClick={handleTransactionModal}>
                CLOSE
              </DAOButton>
            </Box>
          </>
        )}
      </StyledBox>
    </Modal>
  );
};

export default TransactionModal;
