import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import ModalsContainer from 'components/ModalsContainer/ModalsContainer';

import store from 'redux/store';
import apollo from 'config/apollo';

import { GlobalThemeProvider } from 'theme';

import createEmotionCache from '../createEmotionCache';

import WalletProvider from '../web3/WalletProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <WalletProvider>
          <GlobalThemeProvider>
            <CssBaseline />
            <ApolloProvider client={apollo}>
              <ModalsContainer />
              <Component {...pageProps} />
            </ApolloProvider>
          </GlobalThemeProvider>
        </WalletProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
