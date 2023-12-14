import WalletContextProvider from "context/WalletContextProvider";
import DynamicButton from "./DynamicButton";

export default function Page() {
  return (
    <WalletContextProvider>
      <p>My Page</p>
      <DynamicButton />
    </WalletContextProvider>
  );
}
