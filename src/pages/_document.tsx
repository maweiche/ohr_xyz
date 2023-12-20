import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {" "}
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Rubik+Mono+One&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <meta
          name="title"
          property="og:title"
          content="øhr: moments empowered by sound"
        />
        <meta
          name="description"
          property="og:description"
          content="a social sound dApp created to empower users"
        />
        <meta
          name="image"
          property="og:image"
          content="https://raw.githubusercontent.com/noamrubin22/ohr_xyz/main/src/assets/link-preview-img.png"
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/noamrubin22/ohr_xyz/main/src/assets/link-preview-img.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="øhr: moments empowered by sound" />
        <meta
          name="twitter:description"
          content="a social sound dApp created to empower users"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
