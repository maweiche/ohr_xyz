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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
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
