import "fontsource-roboto";
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
