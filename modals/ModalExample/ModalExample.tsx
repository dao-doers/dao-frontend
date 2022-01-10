import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';

import { selectOpen, setOpen } from 'redux/slices/modalExample';

const ModalWidth = styled(Box)`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => `${theme.breakpoints.down('sm')} {
    width: 80vw;
    }`}
`;

const ModalExample: FC = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectOpen);

  const handleModalExample = () => {
    dispatch(setOpen(!isModalOpen));
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalExample} title="Settings">
      <ModalWidth>Example Modal</ModalWidth>
    </Modal>
  );
};

export default ModalExample;
