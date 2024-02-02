"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { Post } from "@components/feed/Post";

interface NFTAttributes {
  Date: string;
  Motivation: string;
  Vibe: string;
}

interface AudioNFT {
  animationUrl: string;
  attributes: NFTAttributes;
}

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
        console.log(result);

        result.items.map((item: any) => {
          console.log(item.content.json_uri);
        });

        // const postPromises: Promise<AudioNFT>[] = result.items.map(
        //   //   async (item: any) => {
        //   //     console.log(item.content.json_uri);
        //   //     // const { animationUrl, attributes } = await fetchJsonData(
        //   //     //   item.content.json_uri
        //   //     // );
        //   //     // if (animationUrl === undefined) {
        //   //     //   console.log(animationUrl);
        //   //     // }
        //   //   }
        //   // );
        //   async (item: any) => {
        //     const data = (await fetchJsonData(
        //       item.content.json_uri
        //     )) as AudioNFT; // Type assertion
        //     if (data.animationUrl === undefined) {
        //       console.log(data.animationUrl);
        //     }
        //     // const { animationUrl, attributes } = data;

        //     // if (animationUrl) {
        //     //   return {
        //     //     animationUrl,
        //     //     attributes,
        //     //   };}
        //   }
        // );
        // const validPosts = (await Promise.all(postPromises)).filter(
        //   (post) => post !== undefined
        // );

        // setPosts(validPosts as AudioNFT[]);
        // setIsLoading(false); // Set loading state to false

        // console.log("Posts: ", validPosts);
      } else {
        console.error("Failed to fetch assets:", response.status);
        setIsLoading(false); // Set loading state to false on error
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      setIsLoading(false); // Set loading state to false on error
    }
  };

  useEffect(() => {
    searchAssets();
  }, []); // Run the searchAssets function once, when the component mounts

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <h1>data</h1>
        // <Post title={""} date={""} audioUrl={""} owner={""} post={undefined} />
        /* Render your posts here */
      )}
    </div>
  );
};
