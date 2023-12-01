/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import Image from "next/image";
import React from "react";

const AboutScreen = () => {
  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="About"
      showFooter={false}
    >
      <div className="flex flex-col justify-start mx-6 gap-5 overflow-scroll">
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
        <hr className="my-6" />
        <div className="flex flex-col h-screen justify-center align-center items-center gap-4 text-center">
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
            <div className="flex h-7 justify-center mt-2 gap-4 ">
              <a href="https://twitter.com/nusha22_" target="_blank">
                <img src="x-icon.png" alt="X" />
              </a>
              <a href="https:/instagram.com/nusha.dev" target="_blank">
                <img src="ig-icon.png" alt="Instagram" />
              </a>
              <a href="https://linkedin.com/nusha22_" target="_blank">
                <img src="li-icon.png" alt="LinkedIn" />
              </a>
              <a href="https://twitter.com/nusha22_" target="_blank">
                <img src="gh-icon.png" alt="GitHub" />
              </a>
            </div>
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
            <div className="flex h-7 justify-center mt-2 gap-4 ">
              <img src="x-icon.png" alt="X" />
              <img src="ig-icon.png" alt="Instagram" />
              <img src="li-icon.png" alt="LinkedIn" />
              <img src="tt-icon.png" alt="Tiktok" />
            </div>
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
