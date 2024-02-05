"use client";

import LoadingComponent from "@components/LoadingComponent";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { AudioNFT } from "@components/map/NFTModal";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const fetchJsonData = async (jsonUri: string) => {
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
      // TODO: add Error message
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // TODO: add Error message
    throw error;
  }
};

export const getValidPosts = async () => {
  try {
    const response = await fetch("/api/nfts?initialPageNumber=1");
    const result = await response.json();

    if (response.ok) {
      const postPromises: Promise<AudioNFT>[] = result.map(
        async (item: any) => {
          const { animationUrl, attributes } = await fetchJsonData(
            item.content.json_uri
          );
          const { owner } = item.ownership;
          const { metadata } = item.content;
          const { assetId, burnt } = item.id;

          const attributesObj = attributes?.reduce(
            (acc: any, attribute: any) => {
              acc[attribute.trait_type] = attribute.value;
              return acc;
            },
            {}
          );

          if (animationUrl && attributes && !burnt) {
            return {
              animationUrl,
              attributesObj,
              metadata,
              owner,
              assetId,
            };
          }
        }
      );

      const validPosts = (await Promise.all(postPromises)).filter(
        (post) => post !== undefined
      );
      return validPosts;
    } else {
      console.error("Failed to fetch assets:", response.status);
    }
  } catch (error) {
    console.error("Error fetching assets: ", error);
  }
};

export const sortPosts = (posts: AudioNFT[]) => {
  return posts.sort((a, b) => {
    if (a.attributesObj?.Date && b.attributesObj?.Date) {
      return (
        new Date(b.attributesObj.Date).getTime() -
        new Date(a.attributesObj.Date).getTime()
      );
    } else if (a.attributesObj?.Date) {
      return -1;
    } else if (b.attributesObj?.Date) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const FeedComponent = () => {
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);
  const fetchNFTs = async () => {
    try {
      const validPosts = await getValidPosts();
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
