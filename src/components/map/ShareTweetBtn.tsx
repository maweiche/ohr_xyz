import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

interface ShareTweetBtnProps {
  link: string;
}

const ShareTweetBtn: React.FC<ShareTweetBtnProps> = ({ link }) => {
  const tweetButtonLink = `https://x.com/intent/tweet?text=${encodeURIComponent(
    "Listen to this øhr 👂" + `\n` + link
  )}`;

  return (
    <div>
      <Link
        className="gap-2 border border-gray-300 p-5 flex justify-center rounded-full flex-col bg-black"
        href={tweetButtonLink}
      >
        {" "}
        <Image src={"/x-icon.png"} alt="X" width={22} height={22} />
      </Link>
      <p className="text-xs text-center text-white mt-2">X</p>
    </div>
  );
};

export default ShareTweetBtn;
