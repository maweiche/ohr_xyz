"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { AudioNFT } from "@components/map/NFTModal";
import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import LoadingComponent from "@components/LoadingComponent";
import { fetchJsonData, getValidPosts, sortPosts } from "utils/postsUtils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Web3AuthLogin from "@components/web3Auth/Web3AuthLogin";
import { checkLogin } from "../../utils/checkLogin";

const url = process.env.NEXT_PUBLIC_HELIUS_MAINNET || "";

export const ProfileComponent = () => {
  const { publicKey } = useWallet();
  const [web3AuthPublicKey, setWeb3AuthPublicKey] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<AudioNFT[] | undefined>(undefined);
  const [shouldConnectWallet, setShouldConnectWallet] =
    useState<boolean>(false);

  const searchAssets = async (publicKey: string) => {
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
              // "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv", // devnet
              "9QSdt6TgXJfyqWMxfcZwk3acVSQTB3o3Fk9FHkzUgKk9", // mainnet
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
    checkLogin().then((res: boolean) => {
      if (res) {
        console.log("res: " + res);
        const pubkey = localStorage.getItem("web3pubkey");
        setWeb3AuthPublicKey(pubkey);
        setShouldConnectWallet(false);
        searchAssets(pubkey!);
      } else {
        console.log("res: " + res);
        setShouldConnectWallet(true);
      }
    });
    if (publicKey) {
      setShouldConnectWallet(false);
      searchAssets(publicKey.toString());
    } else if (!publicKey && !web3AuthPublicKey) {
      setShouldConnectWallet(true);
    }
  }, [publicKey]);

  return (
    <LayoutComponent showTitle="yøhrs" showFooter={true} showNavBar={true}>
      {shouldConnectWallet ? (
        <div
          className="flex flex-col justify-center items-center align-center absolute top-0 left-0 w-full"
          style={{ height: "100dvh" }}
        >
          <p className="w-1/2 text-center m-5">
            Log in with your wallet to see your øhrs
          </p>
          <WalletMultiButton />
          <Web3AuthLogin />
        </div>
      ) : (posts && publicKey && !isLoading) ||
        (posts && web3AuthPublicKey && !isLoading) ? (
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
