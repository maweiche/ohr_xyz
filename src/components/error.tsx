import { useRouter } from "next/router";
import React from "react";

export const Error = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create/record?discard=true");
  };

  return (
    <div className="alert bg-[#7e2986] shadow-md shadow-black border-[#a223ad]  text-white/40 border-2">
      <span className="text-[#64ed14]">Something went wrong. </span>
      <div>
        <button
          onClick={handleClick}
          className="btn btn-sm btn-primary bg-[#7e2986] shadow-md shadow-black  text-[#64ed14] border-[#a223ad] border-2 m-2  bg-transparent "
        >
          Try again
        </button>
      </div>
    </div>
  );
};
