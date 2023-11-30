/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import React from "react";

const AboutScreen = () => {
  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="About"
      showFooter={false}
    >
      <div className="flex flex-col justify-start mx-6 gap-5 overflow-scroll h-screen">
        <div className="flex flex-col justify-center h-screen items-center align-center text-center my-20 gap-4">
          <h1>We believe in the power of sound! </h1>
          <p>
            Sound grabs our attention instantly, makes us feel deeply, activates
            our imagination, and triggers memories in a profound way.{" "}
          </p>
          <p>
            {" "}
            We are convinced that this amazing medium holds an untapped
            potential and that's why we're building a social mobile dApp where
            audio memories can be saved, shared, valued and traded.
          </p>{" "}
          <p>
            {" "}
            Through our unique platform, we're not just changing how we interact
            with our memories; we're also creating a vibrant community centered
            around the power of sound.
          </p>
        </div>
        <hr className="my-14" />
        <div className="flex flex-col h-screen justify-center align-center items-center gap-4 text-center mt-5">
          <h1 className="text-xl">Team</h1>
          <div className="rounded-lg flex justify-center">
            <img
              src="/nusha.jpeg"
              alt="Nusha"
              className=""
              width={200}
              height={200}
            />
          </div>
          <div>
            <h2 className="p-0 m-0">Nusha / Noam Rubin - Founder </h2>
            <p className="text-sm">Technology</p>
          </div>
          <div className="rounded-lg flex justify-center">
            <img
              src="/mm.jpg"
              alt="Mimi Mimita"
              className=""
              width={200}
              height={200}
            />
          </div>
          <div>
            <h2 className="p-0 m-0">Mimi Mimita - Co-Founder </h2>
            <p className="text-sm">Marketing & Community</p>
          </div>
        </div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </LayoutComponent>
  );
};

export default AboutScreen;
