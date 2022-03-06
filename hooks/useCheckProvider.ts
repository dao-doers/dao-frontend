import { useEffect, useState } from 'react';

import detectEthereumProvider from '@metamask/detect-provider';

const useCheckProvider = () => {
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setHasProvider(true);
      }
    };
    setProvider();
  }, []);

  return hasProvider;
};

export default useCheckProvider;
