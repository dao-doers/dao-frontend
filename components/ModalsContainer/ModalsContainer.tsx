import { FC } from 'react';

import TransactionModal from 'modals/TransactionModal/TransactionModal';
import DCkbMintModal from 'modals/dCkbMintModal/dCkbMintModal';
import DCkbTransferModal from 'modals/dCkbTransferModal/dCkbTransferModal';
import WalletsModal from 'modals/WalletsModal/WalletsModal';

const ModalsContainer: FC = () => {
  return (
    <>
      <TransactionModal />
      <DCkbMintModal />
      <DCkbTransferModal />
      <WalletsModal />
    </>
  );
};

export default ModalsContainer;
