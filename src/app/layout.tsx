// import { GeistSans } from "geist/font/sans";
import "./globals.css";

import WalletContextProvider from "../context/WalletContextProvider";
import React from "react";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

export const metadata = {
  // metadataBase: new URL(defaultUrl),
  title: "øhr",
  description: "We believe in the power of sound.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta', if changing -> also chnge it in ClientWalletProvider
  // const network = WalletAdapterNetwork.Mainnet;
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  {
    /* <link
        href="https://fonts.googleapis.com/css2?family=Bangers&family=Rubik+Mono+One&display=swap"
        rel="stylesheet"
></link> */
  }
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <main className="min-h-screen flex flex-col items-center">
          <WalletContextProvider>{children}</WalletContextProvider>
        </main>
      </body>
    </html>
  );
}
