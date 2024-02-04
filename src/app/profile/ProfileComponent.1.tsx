"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { AudioNFT } from "@components/map/NFTModal";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import LoadingComponent from "@components/LoadingComponent";

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

      if (response.ok) {
        const { result } = await response.json();
        const postPromises: Promise<AudioNFT>[] = result.items.map(
          async (item: any) => {
            const { animationUrl, attributes } = await fetchJsonData(
              item.content.json_uri
            );
            const owner = item.ownership.owner;
            const metadata = item.content.metadata;
            const assetId = item.id;
            const burnt = item.burnt;
            // attributes = [{trait_type: 'Date', value: '03 Feb 2024 18:12'}]
            // parse the attributes and store them in a more readable format, e.g. {Date: '03 Feb 2024 18:12'}'
            const attributesObj = attributes.reduce(
              (acc: any, attribute: any) => {
                acc[attribute.trait_type] = attribute.value;
                return acc;
              },
              {}
            );
            if (animationUrl && attributes && !burnt) {
              return { animationUrl, attributesObj, metadata, owner, assetId };
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
    if (publicKey) {
      searchAssets();
    }
  }, [publicKey]);

  return (
    <LayoutComponent showTitle="Yøhrs" showFooter={true} showNavBar={true}>
      {posts && publicKey && !isLoading ? (
        posts.map((post, index) => {
          console.log(post);
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
                post={post.metadata}
                assetId={post.assetId}
                profile={true}
              />
            );
          }
        })
      ) : (
        <div className="flex h-full justify-center align-center">
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
