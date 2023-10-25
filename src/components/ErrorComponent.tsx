import { useRouter } from "next/router";
import React from "react";

interface ErrorComponentProps {
  message: string;
  buttonText: string;
}

export const ErrorComponent = ({
  message,
  buttonText,
}: ErrorComponentProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="alert bg-[#7e2986] shadow-md shadow-black border-[#a223ad]  text-white/40 border-2">
      <span className="text-[#64ed14]">{message}</span>
      <div>
        <button
          onClick={handleClick}
          className="btn btn-sm btn-primary bg-[#7e2986] shadow-md shadow-black  text-[#64ed14] border-[#a223ad] border-2 m-2  bg-transparent "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
