/* eslint-disable react/no-unescaped-entities */
import { LayoutComponent } from "../../../components/layout/LayoutComponent";
import Link from "next/link";
import React from "react";

const FlowSpace = () => {
  return (
    <LayoutComponent
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
            <li>Flowspace</li>
          </ul>
        </div>
        <p>On lfkdah we organised a flowspace</p>
        <div className="text-sm breadcrumbs overflow-x-visible">
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>Flowspace</li>
          </ul>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default FlowSpace;
