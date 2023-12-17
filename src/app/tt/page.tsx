import WalletContextProvider from "../../context/WalletContextProvider";
import DynamicButton from "./DynamicButton";
import React from "react";

export default function Page() {
  return (
    <WalletContextProvider>
      <p>My Page</p>
      <DynamicButton />
    </WalletContextProvider>
  );
}
