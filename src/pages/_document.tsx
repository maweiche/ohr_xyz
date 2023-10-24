import { Html, Head, Main, NextScript } from "next/document";

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
          href="https://unpkg.com/maplibre-gl@3.2.1/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
