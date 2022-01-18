import Web3 from 'web3';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface IWeb3Context {
  provider: any;
  web3: any;
  isLoading: boolean;
}

interface IWeb3ExtendedContext {
  provider: any;
  web3: any;
  isLoading: boolean;
  connect: () => any;
  requireInstall: boolean;
}

const Web3Context = createContext<IWeb3Context | null>(null);

export const MetamaskProvider: React.FC = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3Context>({
    provider: null,
    web3: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await window.ethereum;

      if (provider) {
        const web3 = new Web3(provider as any);

        setWeb3Api({
          provider,
          web3,
          isLoading: false,
        });
      } else {
        setWeb3Api(api => ({
          ...api,
          isLoading: false,
        }));
        console.error('Please install Metamask');
      }
    };

    loadProvider();
  }, []);

  const Web3Api = useMemo<IWeb3ExtendedContext>(() => {
    return {
      ...web3Api,
      requireInstall: !web3Api.isLoading && web3Api.web3,
      connect: web3Api.provider
        ? async () => {
            try {
              await web3Api.provider.request({
                method: 'eth_requestAccounts',
              });
            } catch (error) {
              window.location.reload();
            }
          }
        : () => console.log('Cannot connect to Metamask'),
    };
  }, [web3Api]);

  return <Web3Context.Provider value={Web3Api}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  return useContext(Web3Context) as IWeb3ExtendedContext;
};
