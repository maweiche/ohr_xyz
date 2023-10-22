import { ErrorComponent } from "@components/ErrorComponent";
import { CompressedMint } from "@components/create/minting/CompressedMint";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useState } from "react";
import useMetadataStore from "utils/useMetadataStore";

const Minting = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { metadata } = useMetadataStore();
  console.log("metadata: ", metadata);

  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="center"
      showTitle="mint"
    >
      <div>
        {hasError && (
          <div className="h-4/6 w-full flex flex-col justify-center mt-10 ">
            <div className="p-4 flex justify-center align-center">
              <ErrorComponent />
            </div>
          </div>
        )}
        <CompressedMint
          timeStamp={metadata.timeStamp}
          theVibe={metadata.theVibe ?? "Bullish"}
          longitude={metadata.longitude ?? ""}
          latitude={metadata.latitude ?? ""}
          setIsMinting={setIsMinting}
          isMinting={isMinting}
        />
      </div>
    </LayoutComponent>
  );
};

export default Minting;
