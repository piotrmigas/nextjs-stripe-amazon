import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import "../styles/globals.css";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
