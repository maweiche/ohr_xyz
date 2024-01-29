"use client";

import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import React from "react";

export const FeedComponent = () => {
  return (
    <LayoutComponent showTitle="Feed" showFooter={true} showNavBar={true}>
      <div className="overflow-auto">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </LayoutComponent>
  );
};
