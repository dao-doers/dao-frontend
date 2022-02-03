import type { AppProps } from 'next/app';
import Web3 from 'web3';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import ModalsContainer from 'components/ModalsContainer/ModalsContainer';

import store from 'redux/store';

import { GlobalThemeProvider } from 'theme';

import config from 'config/config';

import createEmotionCache from '../createEmotionCache';

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

declare global {
  interface Window {
    web3: Web3;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <GlobalThemeProvider>
          <CssBaseline />
          <ApolloProvider client={client as any}>
            <ModalsContainer />
            <Component {...pageProps} />
          </ApolloProvider>
        </GlobalThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
