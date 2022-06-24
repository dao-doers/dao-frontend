import { FC } from 'react';

import TransactionModal from 'modals/TransactionModal/TransactionModal';
import DCkbMintModal from 'modals/dCkbMintModal/dCkbMintModal';
import WalletsModal from 'modals/WalletsModal/WalletsModal';

const ModalsContainer: FC = () => {
  return (
    <>
      <TransactionModal />
      <DCkbMintModal />
      <WalletsModal />
    </>
  );
};

export default ModalsContainer;
