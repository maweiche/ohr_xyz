import Layout from "@components/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import TweetButton from "./tweet-button";
import { getFirstArrayElementOrValue } from "utils/formatUtils";

export const SuccessPage = () => {
  const router = useRouter();
  const solscanLink = getFirstArrayElementOrValue(router.query.solscanLink);

  return (
    <>
      <Layout showWallet="header" showLogo={true}>
        <h2 className="my-4 text-center">You minted your audio NFT</h2>
        {solscanLink && (
          <TweetButton
            nftLink={solscanLink}
            tweetText="Hey, check out this audio NFT I minted on @ohr_xyz 👂 at the Hacker House in Berlin @hackerhouses: "
          />
        )}
      </Layout>
    </>
  );
};
