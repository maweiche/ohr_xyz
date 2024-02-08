"use client";

import LoadingComponent from "@components/LoadingComponent";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { AudioNFT } from "@components/map/NFTModal";
import React, { useEffect, useState } from "react";
import { getValidPosts, sortPosts } from "../../utils/postsUtils";

export const FeedComponent = () => {
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);
  const fetchNFTs = async () => {
    const response = await fetch("/api/nfts?initialPageNumber=1");
    try {
      const validPosts = await getValidPosts(response);
      console.log("validPosts: ", validPosts);
      if (validPosts) {
        const posts = sortPosts(validPosts);
        setPosts(posts);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    if (!posts) {
      fetchNFTs();
    }
  }, []);

  return (
    <LayoutComponent showTitle="Feed" showFooter={true} showNavBar={true}>
      {posts ? (
        posts.map((post, index) => {
          if (post.animationUrl && !post.animationUrl.includes("undefined")) {
            return (
              <Post
                title={post.attributesObj?.Vibe}
                date={post.attributesObj?.Date}
                audioUrl={post.animationUrl}
                key={index}
                owner={post.owner}
                post={post}
                assetId={post.id.toString()}
              />
            );
          }
        })
      ) : (
        <div
          className="flex justify-center align-center absolute top-0 left-0 w-full"
          style={{ height: "100dvh" }}
        >
          <LoadingComponent />
        </div>
      )}
    </LayoutComponent>
  );
};
