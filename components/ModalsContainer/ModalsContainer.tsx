import { FC } from 'react';

import TransactionModal from 'modals/TransactionModal/TransactionModal';
import DCkbMintModal from 'modals/dCkbMintModal/dCkbMintModal';
import DCkbTransferModal from 'modals/dCkbTransferModal/dCkbTransferModal';

const ModalsContainer: FC = () => {
  return (
    <>
      <TransactionModal />
      <DCkbMintModal />
      <DCkbTransferModal />
    </>
  );
};

export default ModalsContainer;
