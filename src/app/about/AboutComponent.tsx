"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import React, { useRef } from "react";

const AboutComponent = () => {
  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="About"
      showFooter={false}
    >
      <div className="flex flex-col justify-start overflow-scroll">
        <div style={{ height: "100dvh" }}>
          <div className="flex flex-col justify-center items-center align-center text-center gap-4 mx-4">
            <h1>We believe in the power of sound! </h1>
            <p>
              Sound grabs our attention instantly, makes us feel deeply,
              activates our imagination, and triggers memories in a profound
              way.{" "}
            </p>
            <p>
              {" "}
              We are convinced that this amazing medium holds an untapped
              potential and that's why we're building a social mobile dApp where
              audio memories can be saved, shared, valued and traded.
            </p>{" "}
            <p>
              {" "}
              Through our unique platform, we're not just changing how we
              interact with our memories; we're also creating a vibrant
              community centered around the power of sound.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col h-screen justify-center align-center items-center gap-2 text-center"
          style={{ height: "100dvh" }}
        >
          <h1 className="text-xl">Team</h1>
          <div className="rounded-lg flex justify-center">
            <img
              src="/nusha.jpeg"
              alt="Nusha"
              className=""
              width={150}
              height={150}
            />
          </div>
          <div>
            <h2 className="p-0 m-0">Nusha / Noam Rubin - Founder </h2>
            <p className="text-sm">Technology</p>
            <div className="flex justify-center items-center align-center gap-4 m-2">
              <a href="https://twitter.com/nusha22_" target="_blank">
                <img
                  src="x-icon.png"
                  alt="X"
                  className="w-6 h-6 object-cover"
                />
              </a>
              <a href="https:/instagram.com/nusha.dev" target="_blank">
                <img
                  src="ig-icon.png"
                  alt="Instagram"
                  className="w-7 h-7 object-cover"
                />
              </a>
              <a href="https://linkedin.com/nusha22_" target="_blank">
                <img
                  src="li-icon.png"
                  alt="LinkedIn"
                  className="w-6 h-6 object-cover"
                />
              </a>
              <a href="https://twitter.com/nusha22_" target="_blank">
                <img
                  src="gh-icon.png"
                  alt="GitHub"
                  className="w-5 h-5 object-cover"
                />
              </a>
            </div>
          </div>
          <div className="rounded-lg flex justify-center">
            <img
              src="/mm.jpg"
              alt="Mimi Mimita"
              className=""
              width={150}
              height={150}
            />
          </div>
          <div>
            <h2 className="p-0 m-0">Mimi Mimita - Co-Founder </h2>
            <p className="text-sm">Marketing & Community</p>
            <div className="flex justify-center items-center align-center gap-4 m-4">
              <a href="https://twitter.com/mimimusics" target="_blank">
                <img
                  src="x-icon.png"
                  alt="X"
                  className="w-6 h-6 object-cover"
                />
              </a>
              <a href="https:/instagram.com/mimimusics" target="_blank">
                <img
                  src="ig-icon.png"
                  alt="Instagram"
                  className="w-7 h-7 object-cover"
                />
              </a>
              <a href="https://www.linkedin.com/in/mimimitina/" target="_blank">
                <img
                  src="li-icon.png"
                  alt="LinkedIn"
                  className="w-6 h-6 object-cover"
                />
              </a>
              <a href="https://www.tiktok.com/@mimimusics" target="_blank">
                <img
                  src="tt-icon.png"
                  alt="Tiktok"
                  className="w-6 h-6 object-cover"
                />
              </a>
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

export default AboutComponent;
