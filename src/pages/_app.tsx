import { type AppType } from "next/app";
import App from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Navbar } from "../component/navbar";
import { Session } from "~/server/api/trpc";
import { AuthProvider, getServerAuthSession } from "~/utils/session";
import { Toaster } from "react-hot-toast";

//@ts-ignore
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <AuthProvider session={session}>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

//@ts-ignore
MyApp.getInitialProps = async (appContext) => {
  //@ts-ignore
  const pageProps = await App.getInitialProps(appContext);
  const session = getServerAuthSession(appContext.ctx);
  return {
    pageProps: {
      ...pageProps,
      session,
    },
  };
};

export default api.withTRPC(MyApp);
