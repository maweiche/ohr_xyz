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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="øhr: memories empowered by sound" />
        <meta
          name="twitter:description"
          content="a social dApp using sound that is empowering its users"
        />
        <meta
          name="twitter:image"
          content="https://github.com/noamrubin22/ohr_xyz/blob/c18749ccbf9e402ddca826919b9fe322199bbf96/src/assets/link-preview-img.png"
        />

        <meta property="og:title" content="øhr: memories empowered by sound" />
        <meta
          property="og:description"
          content="a social dApp using sound that is empowering its users"
        />
        <meta
          property="og:image"
          content="https://github.com/noamrubin22/ohr_xyz/blob/c18749ccbf9e402ddca826919b9fe322199bbf96/src/assets/link-preview-img.png"
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
