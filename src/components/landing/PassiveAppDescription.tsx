import React, { useState } from "react";

export const PassiveAppDescription = () => {
  const [isCommunityActive, setIsCommunityActive] = useState(false);
  const [isFollowActive, setIsFollowActive] = useState(false);

  const activateCommunity = () => setIsCommunityActive(true);
  const deactivateCommunity = () => setIsCommunityActive(false);

  const activateFollow = () => setIsFollowActive(true);
  const deactivateFollow = () => setIsFollowActive(false);

  return (
    <div className={"z-10"}>
      <p className="text-md secondary-font mt-1">
        Want to be updated on our progress and next launch?
      </p>
      <div className="flex mt-5 gap-3">
        <p
          className={`border-2 p-2 rounded-lg text-md mt-2  w-1/2 ${
            isCommunityActive && "border-[#64ed14] text-[#64ed14]"
          }`}
        >
          <a
            href="https://ohr-community.xyz"
            onMouseDown={activateCommunity}
            onMouseUp={deactivateCommunity}
            onMouseLeave={deactivateCommunity}
            onTouchStart={activateCommunity}
            onTouchEnd={deactivateCommunity}
          >
            Join our community
          </a>
        </p>
        <p
          className={`border-2 p-2 rounded-lg text-md mt-2 w-1/2 ${
            isFollowActive && "border-[#64ed14] text-[#64ed14]"
          }`}
        >
          <a
            href="https://x.com/ohr_xyz"
            onMouseDown={activateFollow}
            onMouseUp={deactivateFollow}
            onMouseLeave={deactivateFollow}
            onTouchStart={activateFollow}
            onTouchEnd={deactivateFollow}
          >
            follow us on X
          </a>
        </p>
      </div>
    </div>
  );
};
