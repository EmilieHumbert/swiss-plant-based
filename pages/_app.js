import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";

import { AuthProvider } from "../hooks/useAuth";
import Navigation from "../components/navigation";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CssBaseline />
      <Navigation />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
