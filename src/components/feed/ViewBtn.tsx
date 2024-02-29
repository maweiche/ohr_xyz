import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const ViewBtn = () => {
  const router = useRouter();
  const handleClick = (type: string) => {
    router.push(`/${type}`);
  };
  return (
    <div className="flex justify-center m-0 border rounded-xl w-20 align-center self-center ">
      <button onClick={() => handleClick("feed")} className="p-2 border-r">
        List
      </button>
      <button onClick={() => handleClick("map")} className="p-2 ">
        Map
      </button>
    </div>
  );
};
