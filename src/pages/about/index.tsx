/* eslint-disable @next/next/no-img-element */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import React from "react";

const AboutScreen = () => {
  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="About"
      showFooter={false}
    >
      <div className="flex flex-col justify-start mx-6 gap-5 overflow-scroll">
        <p>We believe in the power of sound! </p>
        <p>
          Sound grabs our attention instantly, makes us feel deeply, activates
          our imagination, and triggers memories in a profound way.{" "}
        </p>
        <p>
          {" "}
          By using sound as its primary medium and blockchain as its underlying
          technology, we are building a social mobile dApp where audio memories
          can be saved, shared, valued and traded.
        </p>{" "}
        <p>
          {" "}
          With this innovative platform we do not only redefine how we engage
          with our memories but also foster a vibrant community centered around
          the power of sound.
        </p>
        <h1 className="text-lg">Team</h1>
        <div className="rounded-lg flex justify-center">
          <img
            src="/øhr_team.jpeg"
            alt="øhr team"
            className="mask mask-squircle"
            width={300}
            height={300}
          />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default AboutScreen;
