import React from "react";

interface ShareTweetBtnProps {
  link: string;
}

const ShareTweetBtn: React.FC<ShareTweetBtnProps> = ({ link }) => {
  const tweetButtonLink = `https://x.com/intent/tweet?text=${encodeURIComponent(
    "Listen to this øhr 👂" + `\n` + link
  )}`;

  return (
    <div className="gap-2 border-2 m-3 p-2 px-4 flex justify-center rounded-xl">
      <a href={tweetButtonLink} target="_blank">
        Share on X
      </a>
    </div>
  );
};

export default ShareTweetBtn;
