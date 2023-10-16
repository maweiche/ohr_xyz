import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import React from "react";
import TweetButton from "../../../components/create/success/TweetBtn";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import TweetBtn from "../../../components/create/success/TweetBtn";

const SuccessPage = () => {
  const router = useRouter();
  const solscanLink = getFirstArrayElementOrValue(router.query.solscanLink);

  return (
    <>
      <LayoutComponent showWallet="header" showLogo={true}>
        <h1 className="my-4 text-center text-3xl">Check your wallet!</h1>
        <h2 className="my-4 text-center">You minted your audio NFT</h2>
        {solscanLink && (
          <TweetBtn
            nftLink={solscanLink}
            tweetText="Hey, check out this audio NFT I minted on @ohr_xyz 👂 at the Hacker House in Berlin @hackerhouses: "
          />
        )}
      </LayoutComponent>
    </>
  );
};

export default SuccessPage;
