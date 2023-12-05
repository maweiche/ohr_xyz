import Head from "next/head";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import Toaster from "@components/Toaster";
import RecordingPage from "./create";
import Script from "next/script";
import useMenuStore from "utils/useMenuStore";

export default function Home() {
  const { isMenuDisabled } = useMenuStore();
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-1RPC444F7W" />
      <Script id="google-analytics">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'G-1RPC444F7W');
        `}
      </Script>
      <Head>
        <title>øhr</title>
        <meta name="description" content="We believe in the power of sound!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://ohr-app.xyz" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb app id" />
        <meta property="og:title" content="Hear my øhr" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Hear this out! I minted an øhr  "
        />
        <meta property="og:image" content={"url of image"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutComponent
        showNavBar={true}
        showTitle="Record"
        showFooter={!isMenuDisabled ? true : false}
      >
        <Toaster />
        <RecordingPage />
      </LayoutComponent>
    </>
  );
}
