import { motion } from "framer-motion";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  bundlrStorage,
  Metaplex,
  toMetaplexFile,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { mintNFT, uploadMetadata } from "utils/mintNFTUtils";
import { METADATA } from "utils/constants";
import { Dispatch, SetStateAction } from "react";
import { Loading } from "@components/Loading";
import { dataUrlToBytes } from "utils/arrayBufferUtils";

interface MintNFTProps {
  recordingUrl: string;
  setIsMinting: Dispatch<SetStateAction<boolean>>;
  isMinting: boolean;
  setHasError: Dispatch<boolean>;
  timeStamp: string;
  theVibe: string;
}

const connectToBlockChain = (wallet: WalletContextState) => {
  if (!process.env.NEXT_PUBLIC_RPC) return;

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC); // mainnet
  const metaplex = Metaplex.make(connection);
  metaplex.use(walletAdapterIdentity(wallet));
  metaplex.use(bundlrStorage()); /// mainnet

  return metaplex;
};

const connectToBlockChainDevNet = (wallet: WalletContextState) => {
  if (!process.env.NEXT_PUBLIC_RPC) return;

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // devnet
  const metaplex = Metaplex.make(connection);
  metaplex.use(walletAdapterIdentity(wallet));
  metaplex.use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      timeout: 60000,
    })
  );

  return metaplex;
};

const setAudioBuffer = async (metaplex: Metaplex, recordingUrl: string) => {
  const audioBuffer = await dataUrlToBytes(recordingUrl);
  const audioMetaplexFile = toMetaplexFile(audioBuffer, "audio.mp3");
  const audioAsAnimationUrl = await metaplex
    .storage()
    .upload(audioMetaplexFile);

  return audioAsAnimationUrl + "?ext=mp3";
};

const setMetaData = async (
  metaplexInstance: Metaplex,
  recordingUrl: string,
  timeStamp: string,
  theVibe: string
) => {
  const audioUrl = await setAudioBuffer(metaplexInstance, recordingUrl);

  const properties = {
    files: [
      {
        uri: audioUrl,
        type: "audio/mp3",
      },
      {
        uri: "https://6f6rppqqwzhgdw5wi6ik4uieokb5kxaa2zufucwquqhg63e3ss3q.arweave.net/8X0XvhC2TmHbtkeQrlEEcoPVXADWaFoK0KQOb2yblLc?ext=png",
        type: "image/png",
      },
    ],
    category: "video",
  };

  const attributes = [
    { trait_type: "Location", value: "Berlin" },
    { trait_type: "Event", value: "Solana Hacker House" },
    { trait_type: "Date", value: timeStamp },
    { trait_type: "Motivation", value: "LFG" },
    { trait_type: "Vibe", value: theVibe },
  ];
  return { properties, attributes, audioUrl };
};

const MintNFT: React.FC<MintNFTProps> = ({
  recordingUrl,
  setIsMinting,
  isMinting,
  setHasError,
  timeStamp,
  theVibe,
}) => {
  const wallet = useWallet();
  const router = useRouter();

  const uploadMetaDataAndMint = async (recordingUrl: string) => {
    // const metaplexInstance = connectToBlockChain(wallet); // mainnet
    const metaplexInstance = connectToBlockChainDevNet(wallet);

    if (!metaplexInstance) return;

    const { properties, attributes, audioUrl } = await setMetaData(
      metaplexInstance,
      recordingUrl,
      timeStamp,
      theVibe
    );

    const metadataUri = await uploadMetadata(
      METADATA.name,
      METADATA.image,
      METADATA.description,
      audioUrl,
      METADATA.external_url,
      attributes,
      properties,
      metaplexInstance
    );

    mintNFT(
      metadataUri,
      METADATA.name,
      METADATA.sellerFeeBasisPoints,
      METADATA.symbol,
      metaplexInstance,
      router
    );
  };

  const onSubmitNFT = async () => {
    setIsMinting(true);

    try {
      const response = await uploadMetaDataAndMint(recordingUrl);
    } catch (err) {
      console.error("Error in onSubmitNFT:", err);
      setHasError(true);
    }
  };

  const onDiscard = () => {
    router.push("/record?discard=true");
  };

  const mintButtonAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
  };

  return (
    <div className="flex justify-center align-center items-center">
      {!isMinting ? (
        <div className="flex justify-center ">
          <button
            className={
              "text-xl p-2 text-[#d6dfd1] border-2 rounded-lg border-[#b754c0] mx-2 "
            }
            disabled={isMinting}
            onClick={onDiscard}
          >
            back
          </button>
          <motion.button
            className={
              "text-6xl rounded-lg p-2 border-2 border-[#b754c0] bg-[#8c2a87] text-[#f6faf6]"
            }
            onClick={onSubmitNFT}
            variants={mintButtonAnimation}
            initial="initial"
            animate="animate"
            transition={{
              duration: 1,
            }}
          >
            {isMinting ? <i>mint</i> : "mint"}
          </motion.button>
        </div>
      ) : (
        <div className="m-6">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default MintNFT;
