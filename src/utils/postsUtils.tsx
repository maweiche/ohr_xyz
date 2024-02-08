"use client";
import { AudioNFT } from "@components/map/NFTModal";
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

export const getValidPosts = async (response: Response) => {
  try {
    let result = await response.json();

    // in case of the profile page
    if (result.result) {
      result = result.result.items;
    }

    if (response.ok) {
      const postPromises: Promise<AudioNFT>[] = result.map(
        async (item: any) => {
          const { animationUrl, attributes } = await fetchJsonData(
            item.content.json_uri
          );
          const { owner } = item.ownership;
          const { metadata } = item.content;
          const { id, burnt } = item;

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
              id,
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
