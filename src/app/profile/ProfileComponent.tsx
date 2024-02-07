"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { AudioNFT } from "@components/map/NFTModal";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import LoadingComponent from "@components/LoadingComponent";
import {
  fetchJsonData,
  getValidPosts,
  sortPosts,
} from "app/feed/FeedComponent";

export const ProfileComponent = () => {
  const url = process.env.NEXT_PUBLIC_HELIUS_DEVNET || "";
  const { publicKey } = useWallet();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);

  const searchAssets = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "searchAssets",
          params: {
            ownerAddress: publicKey?.toString(),
            grouping: [
              "collection",
              "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv",
            ],
            page: 1, // Starts at 1
            limit: 100,
          },
        }),
      });

      const validPosts = await getValidPosts(response);

      if (validPosts) {
        const posts = sortPosts(validPosts);
        setPosts(posts);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      searchAssets();
    }
  }, [publicKey]);

  return (
    <LayoutComponent showTitle="Yøhrs" showFooter={true} showNavBar={true}>
      {posts && publicKey && !isLoading ? (
        posts.map((post, index) => {
          if (!post.animationUrl.includes("undefined")) {
            return (
              <Post
                title={post.attributesObj.Vibe}
                date={post.attributesObj.Date}
                lat={post.attributesObj.Lat}
                long={post.attributesObj.Long}
                audioUrl={post.animationUrl}
                owner={post.owner}
                key={index}
                post={post}
                assetId={post.id.toString()}
                profile={true}
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
      {!isLoading && posts?.length == 0 && (
        <div className="flex h-full justify-center items-start align-center text-xl p-2 ">
          Go mint yourself some øhrs!
        </div>
      )}
    </LayoutComponent>
  );
};
