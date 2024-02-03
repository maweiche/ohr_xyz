"use client";

import LoadingComponent from "@components/LoadingComponent";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { AudioNFT } from "@components/map/NFTModal";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const FeedComponent = () => {
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);

  const fetchJsonData = async (jsonUri: string) => {
    try {
      const response = await axios.get(jsonUri);
      if (response.status === 200) {
        const data = response.data;
        if (data.animationUrl === undefined) {
          return {
            animationUrl: undefined,
            attributes: data.attributes,
          };
        } else {
          return {
            animationUrl: data.animationUrl,
            attributes: data.attributes,
          };
        }
      } else {
        console.error("Failed to fetch data:", response.status);
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchNFTs = async () => {
    try {
      const response = await fetch("/api/nfts?initialPageNumber=1");
      const result = await response.json();

      if (response.ok) {
        const postPromises: Promise<AudioNFT>[] = result.map(
          async (item: any) => {
            const { animationUrl, attributes } = await fetchJsonData(
              item.content.json_uri
            );
            const owner = item.ownership.owner;
            const metadata = item.content.metadata;
            const assetId = item.id;
            const burnt = item.burnt;

            const attributesObj = attributes?.reduce(
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
              />
            );
          }
        })
      ) : (
        <div className="flex h-full justify-center align-center">
          <LoadingComponent />
        </div>
      )}
    </LayoutComponent>
  );
};
