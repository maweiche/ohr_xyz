import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();
  const { longitude, latitude } = router.query;

  const handleClick = () => {
    router.push({ pathname: "/map", query: { longitude, latitude } });
  };
  return (
    <>
      <LayoutComponent showWallet="header" showLogo={true}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="my-4 text-center text-3xl">You minted your øhr!</h1>
          <p>check it on the map or your wallet</p>
          <button className="my-4 t border-2 p-5 w-94" onClick={handleClick}>
            Go
          </button>
        </div>
      </LayoutComponent>
    </>
  );
};

export default SuccessPage;
