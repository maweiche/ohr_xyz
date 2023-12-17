"use client";
/* eslint-disable react/no-unescaped-entities */
import { LayoutComponent } from "../../components/layout/LayoutComponent";
import Link from "next/link";
import React from "react";

const BlogComponent = () => {
  return (
    <LayoutComponent justifyStyling="start" showTitle="Blog" showFooter={false}>
      <div className="flex m-6 justify-center overflow-scroll">
        <ul className="flex flex-col gap-4">
          <Link href="/blog/vision" legacyBehavior>
            <li>
              <h1 className="text-md"> Our Vision </h1>
            </li>
          </Link>
          <Link href="/blog/bp" legacyBehavior>
            <li>
              <h1 className="text-md">Breakpoint Talk (video)</h1>
              <p className="text-sm">
                Turning the Tides: Social Media For Enhanced Human Capabilities
              </p>
            </li>
          </Link>
        </ul>
      </div>
    </LayoutComponent>
  );
};

export default BlogComponent;
