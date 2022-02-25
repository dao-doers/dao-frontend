import { FC } from 'react';

import TransactionModal from 'modals/TransactionModal/TransactionModal';
import WireddCKBModal from 'modals/WireddCKBModal/WireddCKBModal';

const ModalsContainer: FC = () => {
  return (
    <>
      <TransactionModal />
      <WireddCKBModal />
    </>
  );
};

export default ModalsContainer;
