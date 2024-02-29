"use client";

import { LayoutComponent } from "../components/layout/LayoutComponent";
import Toaster from "../components/Toaster";
import RecordingPage from "./RecordingPage";
import Script from "next/script";
import useMenuStore from "../utils/useMenuStore";
import React, { useEffect } from "react";

const platforms = [
  "Android",
  "Android_webview",
  "iOS",
  "iOS_webview",
  "Desktop",
] as const;

type OperatingSystem = (typeof platforms)[number];

export default function Home() {
  const { isMenuDisabled } = useMenuStore();

  function getBrowser(): OperatingSystem {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      if (userAgent.includes("wv")) return "Android_webview";
      return "Android";
    }

    const lowerUserAgent = userAgent.toLowerCase(),
      safari = /safari/.test(lowerUserAgent),
      ios = /iphone|ipod|ipad/.test(lowerUserAgent);

    if (ios) {
      if (safari) {
        return "iOS";
      } else {
        return "iOS_webview";
      }
    }

    return "Desktop";
  }

  useEffect(() => {
    const browser = getBrowser();
    alert("browser: " + browser);
  }, []);
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
      <LayoutComponent
        showNavBar={true}
        showTitle="Record"
        showFooter={!isMenuDisabled ? true : false}
      >
        <Toaster />
        {/* <MapScreen /> */}
        <RecordingPage />
      </LayoutComponent>
    </>
  );
}
