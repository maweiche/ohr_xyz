"use client";

import { LayoutComponent } from "../components/layout/LayoutComponent";
import Toaster from "../components/Toaster";
import RecordingPage from "./RecordingPage";
import Script from "next/script";
import useMenuStore from "../utils/useMenuStore";
import React from "react";

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
