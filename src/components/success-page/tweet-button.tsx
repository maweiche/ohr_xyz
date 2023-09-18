import React from "react";

interface TweetButtonProps {
  nftLink: string;
  tweetText: string;
}

const TweetButton: React.FC<TweetButtonProps> = ({ nftLink, tweetText }) => {
  const tweetButtonLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText + " " + nftLink
  )}`;

  return (
    <div className="border-2 rounded-lg text-center p-2 border-[#64ed14] ">
      <a
        className="twitter-share-button text-[#64ed14] text-xl"
        href={tweetButtonLink}
        data-size="large"
      >
        Share the lov3
      </a>
    </div>
  );
};

export default TweetButton;
