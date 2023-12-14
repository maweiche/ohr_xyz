"use client";
/* eslint-disable react/no-unescaped-entities */
import { LayoutComponent } from "@components/layout/LayoutComponent";
import Link from "next/link";
import React from "react";

const VisionComponent = () => {
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
            <li>Our vision</li>
          </ul>
        </div>
        <p>
          In today's fast-paced digital society, we find ourselves drowned with
          an overwhelming influx of visual information. We scroll endlessly,
          consume passively, and, in the process, risk losing touch with that
          what truly defines our humanity. As we unconsciously merge with
          machines, our attention spans fade and our imaginations remain
          inactive.{" "}
        </p>
        <p>
          We've learned to use passive consumption as a distraction, avoiding
          the experience of unpleasant emotions. Yet, this disconnection and
          constant overstimulation have serious consequences for our mental
          well-being.
        </p>{" "}
        <p>Is there a way back? </p>{" "}
        <p>
          With its ability to evoke profound emotional responses, we believe
          sound can bridge the gap between technology and humanity. We've been
          focusing on the visual for quite some time now, and it's left us
          feeling overstimulated. Now, it's time to tap into the untapped
          potential of sound. As a call to activate our imaginations, increase
          our attention spans, reduce the sensory overload and feel deeply.
        </p>{" "}
        <div className="text-sm breadcrumbs overflow-x-visible">
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>Our vision</li>
          </ul>
        </div>
        <p></p>
      </div>
    </LayoutComponent>
  );
};

export default VisionComponent;
