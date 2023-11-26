/* eslint-disable react/no-unescaped-entities */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import Link from "next/link";
import React from "react";

const Breakpoint = () => {
  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Blog"
      showFooter={false}
    >
      <div className="flex flex-col m-5 gap-5 overflow-scroll h-full">
        <div className="text-sm breadcrumbs overflow-x-visible">
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>Breakpoint talk</li>
          </ul>
        </div>
        <p>
          How would our world look like if we could use social media to better
          ourselves rather than being enslaved and consumed by its negative
          impacts?
        </p>
        <p>
          We firmly believe that øhr is a pioneer of the new generation of
          social media: one that enhances us rather than preying on our
          weaknesses.
        </p>
        <p>
          Nusha had the honor to talk about this during the Solana Breakpoint
          conference 2023 in Amsterdam.
        </p>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/TQwULjWx0GE?si=MfBb0rM2e79-UhLe"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="text-sm breadcrumbs overflow-x-visible">
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>Breakpoint talk</li>
          </ul>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Breakpoint;
