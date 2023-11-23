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
      <div className="flex m-6 justify-center overflow-scroll">
        <ul className="flex flex-col gap-4">
          <Link href="/blog/vision">
            <li>
              <h1 className="text-md"> Our Vision </h1>
            </li>
          </Link>
          <Link href="/blog/flowspace">
            <li>
              <h1 className="text-md">Flowspace</h1>
              <p className="text-sm">
                enhancing focus and productivity by harnessing the power of
                sound
              </p>
            </li>
          </Link>
          <Link href="/blog/bp">
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

export default BlogScreen;
