import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { store } from '../redux/store';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
