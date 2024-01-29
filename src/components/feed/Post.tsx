import React from "react";

export const Post = () => {
  return (
    <div className="w-full my-2 px-5">
      <div className="border p-2 m-1 rounded">
        <div className="flex justify-between items-center">
          <p className="text-xl m-1 mx-2">Cool moment</p>
          {/* //audioNFT.attributes.Vibe */}
          <div className="flex gap-2 items-center m-1">
            <p className="text-xs">12 Oct 2023 10:20</p>{" "}
            {/* audioNFT.attributes.Date */}
            <p>L</p>
          </div>
        </div>

        <div className="flex justify-between items-center m-1">
          <audio controls>
            <source src="audioNFT.animationUrl" type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="flex justify-center self-center mt-3"></div>
        {/* audioNFT.attributes.animationUrl */}
        <div className="flex justify-end">
          <button className="border m-1 px-2 rounded">TIP</button>
        </div>
      </div>
    </div>
  );
};
