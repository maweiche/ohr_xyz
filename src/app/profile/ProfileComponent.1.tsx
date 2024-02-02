"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { AudioNFT } from "@components/map/NFTModal";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";

export const ProfileComponent = () => {
  const url = process.env.NEXT_PUBLIC_HELIUS_DEVNET || "";
  const { publicKey } = useWallet();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);

  const fetchJsonData = async (jsonUri: string) => {
    try {
      const response = await axios.get(jsonUri);

      if (response.status === 200) {
        const data = response.data;
        return {
          animationUrl: data.animationUrl,
          attributes: data.attributes,
        };
      } else {
        console.error("Failed to fetch data:", response.status);
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

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
            ownerAddress: publicKey,
            grouping: [
              "collection",
              "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv",
            ],
            page: 1, // Starts at 1
            limit: 1000,
          },
        }),
      });

      if (response.ok) {
        const { result } = await response.json();

        const postPromises: Promise<AudioNFT>[] = result.items.map(
          async (item: any) => {
            const { animationUrl, attributes } = await fetchJsonData(
              item.content.json_uri
            );
            if (animationUrl && attributes) {
              return { animationUrl, attributes };
            }
          }
        );
        const validPosts = (await Promise.all(postPromises)).filter(
          (post) => post !== undefined
        );

        setPosts(validPosts);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch assets:", response.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchAssets();
  }, []);

  return (
    <LayoutComponent showTitle="yøhrs" showFooter={true} showNavBar={true}>
      {/* <div> */}
      {posts ? (
        posts.map((post, index) => {
          console.log(post.attributes);
          return (
            <Post
              title={post.attributes.Vibe}
              date={post.attributes.Date}
              audioUrl={post.animationUrl}
              owner={"publicKey"}
              key={index}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      {/* </div> */}
    </LayoutComponent>
  );
};
