// import { motion } from "framer-motion";
// import { clusterApiUrl, Connection } from "@solana/web3.js";
// import {
//   bundlrStorage,
//   Metaplex,
//   toMetaplexFile,
//   walletAdapterIdentity,
// } from "@metaplex-foundation/js";
// import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
// import { useRouter } from "next/router";
// import { mintNFT, uploadMetadata } from "utils/mintNFTUtils";
// import { METADATA } from "utils/constants";
// import { Dispatch, SetStateAction } from "react";
// import { dataUrlToBytes } from "utils/arrayBufferUtils";
// import { Loading } from "@components/Loading";
// import { useAudioContext } from "context/AudioBlobContext";
// import { getMuxAssetId, getPlaybackId as getAudioUrl } from "utils/mux";

// interface MintNFTProps {
//   // recordingUrl: string;
//   setIsMinting: Dispatch<SetStateAction<boolean>>;
//   isMinting: boolean;
//   setHasError: Dispatch<boolean>;
//   timeStamp: string;
//   theVibe: string;
//   long: string;
//   lat: string;
// }

// const connectToBlockChain = (wallet: WalletContextState) => {
//   if (!process.env.NEXT_PUBLIC_RPC) return;

//   const connection = new Connection(process.env.NEXT_PUBLIC_RPC); // mainnet
//   const metaplex = Metaplex.make(connection);
//   metaplex.use(walletAdapterIdentity(wallet));
//   metaplex.use(bundlrStorage()); /// mainnet

//   return metaplex;
// };

// const connectToBlockChainDevNet = (wallet: WalletContextState) => {
//   if (!process.env.NEXT_PUBLIC_RPC) return;

//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // devnet
//   const metaplex = Metaplex.make(connection);
//   metaplex.use(walletAdapterIdentity(wallet));
//   metaplex.use(
//     bundlrStorage({
//       address: "https://devnet.bundlr.network",
//       timeout: 60000,
//     })
//   );

//   return metaplex;
// };

// const setAudioBuffer = async (metaplex: Metaplex, recordingUrl: string) => {
//   const audioBuffer = await dataUrlToBytes(recordingUrl);
//   const audioMetaplexFile = toMetaplexFile(audioBuffer, "audio.mp3");
//   const audioAsAnimationUrl = await metaplex
//     .storage()
//     .upload(audioMetaplexFile);

//   return audioAsAnimationUrl + "?ext=mp3";
// };

// const setMetaData = async (
//   metaplexInstance: Metaplex,
//   recordingUrl: string,
//   timeStamp: string,
//   theVibe: string,
//   long: string,
//   lat: string
// ) => {
//   // const audioUrl = await setAudioBuffer(metaplexInstance, recordingUrl);

//   // const properties = {
//   //   files: [
//   //     {
//   //       // uri: audioUrl,
//   //       uri: "https://master.mux.com/NzkRg700an3lMQ7n0136yNLkkAyOWNWSV6/master.m4a?skid=default&signature=NjUyYzM4ZjlfODZjM2U0MDllZGYwNzIxMGM0Mzg3MDE0ZjhlNTgxYWQ3ZTY0ODFiMTk0MDYxMzc0YmJjOTZmZmVlZjZlOWI2NQ==",
//   //       type: "audio/m4a",
//   //     },
//   //     {
//   //       uri: "https://6f6rppqqwzhgdw5wi6ik4uieokb5kxaa2zufucwquqhg63e3ss3q.arweave.net/8X0XvhC2TmHbtkeQrlEEcoPVXADWaFoK0KQOb2yblLc?ext=png",
//   //       type: "image/png",
//   //     },
//   //   ],
//   //   category: "video",
//   // };

//   const attributes = [
//     { trait_type: "Location", value: "Berlin" },
//     { trait_type: "Event", value: "Solana Hacker House" },
//     { trait_type: "Date", value: timeStamp },
//     { trait_type: "Motivation", value: "LFG" },
//     { trait_type: "Vibe", value: theVibe },
//     { trait_type: "Long", value: long },
//     { trait_type: "Lat", value: lat },
//   ];
//   return { attributes };
// };

// const MintNFT: React.FC<MintNFTProps> = ({
//   // recordingUrl,
//   setIsMinting,
//   isMinting,
//   setHasError,
//   timeStamp,
//   theVibe,
//   long,
//   lat,
// }) => {
//   const wallet = useWallet();
//   const router = useRouter();
//   const { uploadId } = useAudioContext();

//   const uploadMetaDataAndMint = async (recordingUrl: string) => {
//     // const metaplexInstance = connectToBlockChain(wallet); // mainnet
//     const metaplexInstance = connectToBlockChainDevNet(wallet);

//     if (!metaplexInstance) return;

//     // const { properties, attributes, audioUrl } = await setMetaData(
//     const { attributes } = await setMetaData(
//       metaplexInstance,
//       recordingUrl,
//       timeStamp,
//       theVibe,
//       long,
//       lat
//     );

//     const metadataUri = await uploadMetadata(
//       METADATA.name,
//       METADATA.image,
//       METADATA.description,
//       recordingUrl,
//       // "https://master.mux.com/NzkRg700an3lMQ7n0136yNLkkAyOWNWSV6/master.m4a?skid=default&signature=NjUyYzM4ZjlfODZjM2U0MDllZGYwNzIxMGM0Mzg3MDE0ZjhlNTgxYWQ3ZTY0ODFiMTk0MDYxMzc0YmJjOTZmZmVlZjZlOWI2NQ==",
//       METADATA.external_url,
//       attributes,
//       // properties,
//       metaplexInstance
//     );

//     console.log("MetadataUri: ", metadataUri);

//     mintNFT(
//       metadataUri,
//       METADATA.name,
//       METADATA.sellerFeeBasisPoints,
//       METADATA.symbol,
//       metaplexInstance,
//       router
//     );
//   };

//   const onSubmitNFT = async () => {
//     setIsMinting(true);

//     try {
//       if (!uploadId) {
//         throw new Error("Upload missing.");
//       }
//       const assetId = await getMuxAssetId(uploadId);
//       const recordingUrl = await getAudioUrl(assetId);
//       const response = await uploadMetaDataAndMint(recordingUrl);
//       console.log("onSubmitNFT response: ", response);
//     } catch (err) {
//       console.error("Error in onSubmitNFT:", err);
//       setHasError(true);
//     }
//   };

//   return (
//     <div className="flex justify-center align-center items-center">
//       {!isMinting ? (
//         <div className="flex justify-center ">
//           <button
//             className={
//               "text-xl p-2 text-[#d6dfd1] border-2 rounded-lg border-[#b754c0] mx-2 "
//             }
//             disabled={isMinting}
//             onClick={onDiscard}
//           >
//             back
//           </button>
//           <motion.button
//             className={
//               "text-6xl rounded-lg p-2 border-2 border-[#b754c0] bg-[#8c2a87] text-[#f6faf6]"
//             }
//             onClick={onSubmitNFT}
//             variants={mintButtonAnimation}
//             initial="initial"
//             animate="animate"
//             transition={{
//               duration: 1,
//             }}
//           >
//             {isMinting ? <i>mint</i> : "mint"}
//           </motion.button>
//         </div>
//       ) : (
//         <div className="m-6">
//           <Loading />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MintNFT;
