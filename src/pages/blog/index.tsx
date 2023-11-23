/* eslint-disable react/no-unescaped-entities */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import Link from "next/link";
import React from "react";

const BlogScreen = () => {
  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="start"
      showTitle="Blog"
      showFooter={false}
    >
      <div className="flex m-10 justify-center overflow-scroll">
        <ul>
          <li>
            <Link href="/blog/vision">
              <h1 className="text-xl">&#x2022; Our Vision </h1>
            </Link>
          </li>
        </ul>
      </div>
    </LayoutComponent>
  );
};

export default BlogScreen;
