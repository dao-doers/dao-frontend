import { FC } from 'react';

import TransactionModal from 'modals/TransactionModal/TransactionModal';
import WireddCKBModal from 'modals/WireddCKBModal/WireddCKBModal';
import SUDTTransferModal from 'modals/SUDTTransferModal/SUDTTransferModal';

const ModalsContainer: FC = () => {
  return (
    <>
      <TransactionModal />
      <WireddCKBModal />
      <SUDTTransferModal />
    </>
  );
};

export default ModalsContainer;
