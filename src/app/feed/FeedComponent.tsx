"use client";

import LoadingComponent from "@components/LoadingComponent";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { AudioNFT } from "@components/map/NFTModal";
import React, { useEffect, useState } from "react";

export const FeedComponent = () => {
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);

  useEffect(() => {
    const fetchNFTs = async () => {
      fetch("/api/nfts?initialPageNumber=1")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => console.log(error));
    };

    if (!posts) {
      fetchNFTs();
    }
  }, [posts]);

  //   console.log("POSTS", posts);
  return (
    <LayoutComponent showTitle="Feed" showFooter={true} showNavBar={true}>
      {posts ? (
        posts.map((post, index) => {
          return (
            <Post
              title={post.attributes?.Vibe}
              date={post.attributes?.Date}
              audioUrl={post.animationUrl}
              key={index}
            />
          );
        })
      ) : (
        <div className="flex h-full justify-center align-center">
          <LoadingComponent />
        </div>
      )}
    </LayoutComponent>
  );
};
