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
        <iframe
          width="560"
          height="315"
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
