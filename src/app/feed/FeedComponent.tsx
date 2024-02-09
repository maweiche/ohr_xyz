"use client";

import LoadingComponent from "@components/LoadingComponent";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { AudioNFT } from "@components/map/NFTModal";
import React, { useEffect, useState } from "react";
import { getValidPosts, sortPosts } from "../../utils/postsUtils";

const url = process.env.NEXT_PUBLIC_HELIUS_DEVNET || "";

export const FeedComponent = () => {
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);
  const fetchNFTs = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByGroup",
        params: {
          groupKey: "collection",
          groupValue: "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv",
          page: 1, // Starts at 1
          limit: 1000,
        },
      }),
    });

    // const { result } = await response.json();
    // console.log("Assets by Group: ", result.items);
    try {
      const validPosts = await getValidPosts(response);
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
