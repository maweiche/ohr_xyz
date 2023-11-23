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
      <div className="flex flex-col justify-center items-center m-5 gap-5 overflow-scroll">
        <h1 className="text-lg">Team</h1>
        <div className="rounded-lg">
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
