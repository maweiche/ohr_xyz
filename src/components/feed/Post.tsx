import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";
import TipCreatorModal from "./TipCreatorModal";
import { SoundWave } from "./SoundWave";
import { useRouter } from "next/navigation";
import { AudioNFT } from "@components/map/NFTModal";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import SharePostModal from "./SharePostModal";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  keypairIdentity,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import {
  getAssetWithProof,
  burn,
  AssetWithProof,
} from "@metaplex-foundation/mpl-bubblegum";
import { Connection } from "@solana/web3.js";
import { formatDateAgoOrShortDate } from "utils/formatUtils";
import { checkLogin } from "../../utils/checkLogin";
import RPC from "@components/web3Auth/solanaRPC";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
  post?: AudioNFT;
  assetId?: string;
  profile?: boolean;
  lat?: string;
  long?: string;
}

export const Post: React.FC<PostProps> = ({
  title,
  date,
  audioUrl,
  owner,
  post,
  assetId,
  profile,
  lat,
  long,
}) => {
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [web3AuthPublicKey, setWeb3AuthPublicKey] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { publicKey } = useWallet();
  const wallet = useWallet();

  const linkToTipboard =
    post &&
    (!!post?.attributesObj?.Long && !!post?.attributesObj?.Lat
      ? `/tipboard?owner=${owner}&id=${post.id}&lat=${
          post.attributesObj.Lat
        }&long=${post.attributesObj.Long}${
          post.attributesObj?.Vibe ? `&vibe=${post.attributesObj.Vibe}` : ""
        }`
      : `/tipboard?owner=${owner}&id=${post.id}${
          post.attributesObj?.Vibe ? `&vibe=${post.attributesObj.Vibe}` : ""
        }`);

  const creator =
    owner.substring(0, 3) + "..." + owner.substring(owner.length - 3);

  const handleLocationClick = () => {
    if (post) {
      router.push(
        `/map?id=${post!.id}&latitude=${post!.attributesObj.Lat}&longitude=${
          post!.attributesObj.Long
        }`
      );
    }
  };

  async function burnPost() {
    const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
    const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;

    const umi = createUmi(new Connection(mainRpcEndpoint!)).use(dasApi());
    umi.use(walletAdapterIdentity(wallet));
    // @ts-expect-error : assetId is string
    const assetWithProof: AssetWithProof = await getAssetWithProof(umi, assetId!);
    console.log("assetWithProof", assetWithProof);

    const tx = await burn(umi, {
      ...assetWithProof,
      leafOwner: assetWithProof.leafOwner,
    }).sendAndConfirm(umi);

    console.log("burn,", tx);

    // window.location.reload();
  }

  async function burnPostWithWeb3Auth() {
    console.log("sending burn tx");
    const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
    const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;

    const umi = createUmi(new Connection(mainRpcEndpoint!)).use(dasApi());

    // @ts-ignore
    const assetWithProof = await getAssetWithProof(umi, assetId);
    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!;
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      rpcTarget: "https://api.devnet.solana.com",
      displayName: "Solana Devnet",
      blockExplorer: "https://explorer.solana.com",
      ticker: "SOL",
      tickerName: "Solana Token",
    };
    const web3auth = new Web3AuthNoModal({
      clientId,
      chainConfig,
      // web3AuthNetwork: "sapphire_mainnet",
      web3AuthNetwork: "sapphire_devnet",
    });

    const privateKeyProvider = new SolanaPrivateKeyProvider({
      config: { chainConfig },
    });

    const openloginAdapter = new OpenloginAdapter({
      privateKeyProvider,
      adapterSettings: {
        uxMode: "redirect",
        redirectUrl: window.location.href,
      },
    });
    web3auth.configureAdapter(openloginAdapter);

    await web3auth.init();
    const rpc = new RPC(web3auth.provider!);

    const permission = await rpc.getPermission();
    const uint8Array = new Uint8Array(
      permission.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    const myPermission = umi.eddsa.createKeypairFromSecretKey(uint8Array);
    const mySigner = createSignerFromKeypair(umi, myPermission);
    umi.use(keypairIdentity(mySigner));

    console.log('initiating burn...')

    const tx = await burn(umi, {
      ...assetWithProof,
      leafOwner: assetWithProof.leafOwner,
    }).sendAndConfirm(umi);

    console.log("burn,", tx);

    window.location.reload();
  }

  useEffect(() => {
    if(publicKey) {
      return;
    } else if(!publicKey && !web3AuthPublicKey) {
      checkLogin().then((res: boolean) => {
        if (res) {
          console.log("res: " + res);
          const pubkey = localStorage.getItem("web3pubkey");
          setWeb3AuthPublicKey(pubkey);
        }
      });
    }
  }, [publicKey, web3AuthPublicKey]);

  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex m-5">
          <div className="flex items-center align-center w-full">
            {post && (
              <Link
                href={linkToTipboard ?? ""}
                className="flex align-center items-center"
              >
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <p className="text-xs m-1 mx-2">{creator}</p>
              </Link>
            )}
            <p className="text-xs">● {formatDateAgoOrShortDate(date)}</p>
          </div>
          {post!.attributesObj.Lat && post!.attributesObj.Long && (
            <button onClick={handleLocationClick}>
              <Image
                src={"/location.png"}
                alt="Location"
                width={19}
                height={25}
              />
            </button>
          )}
        </div>
        <div className="">
          <p className="text-md mx-5">{title}</p>
          <div className="flex justify-center w-screen items-center mt-2">
            <SoundWave audioUrl={audioUrl} />
          </div>
          <div className="flex justify-end mx-5 my-2 gap-5 items-center align-center mt-2">
            {!profile && (
              <button
                onClick={() => setShowTipModal(true)}
                className="m-0 p-0 flex justify-center align-center items-center"
              >
                <Image src={"/tip.png"} alt="Tip" width={20} height={18} />
              </button>
            )}
            <button
              onClick={() => {
                setShowShareModal(true);
              }}
              className="m-0 p-0 flex justify-center align-center items-center"
            >
              {" "}
              <Image src={"/share.png"} alt="Share" width={20} height={20} />
            </button>
            {profile && (
              <>
                {publicKey?.toString() === owner ||
                  (web3AuthPublicKey === owner && (
                    <button
                      onClick={() =>
                        publicKey ? burnPost() : burnPostWithWeb3Auth()
                      }
                      className="m-0 p-0 flex justify-center align-center items-center"
                    >
                      {" "}
                      <Image
                        src={"/delete.png"}
                        alt="Delete"
                        width={16}
                        height={18}
                      />
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      {showTipModal && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <TipCreatorModal
            showModal={showTipModal}
            owner={owner}
            mintAddress={post?.id.toString() ?? ""}
            setShowModal={setShowTipModal}
            long={long}
            lat={lat}
            id={post?.id}
            vibe={title}
          />
        </div>
      )}

      {showShareModal && assetId && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <SharePostModal
            showModal={showShareModal}
            setShowModal={setShowShareModal}
            longitude={long}
            latitude={lat}
            id={assetId!}
          />
        </div>
      )}
    </div>
  );
};

// async function editPost() {
//   const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
//   const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
//   const umi = createUmi(new Connection(devnetRpcEndpoint!)).use(dasApi());
//   //   const umi = createUmi(devnetRpcEndpoint!).use(dasApi());
//   umi.use(walletAdapterIdentity(wallet));
//   const updateArgs: UpdateArgsArgs = {
//     name: 'New name',
//     uri: 'https://updated-example.com/my-nft.json',
//   }
//   // @ts-ignore
//   const assetWithProof = await getAssetWithProof(umi, assetId);
//   console.log('assetWithProof', assetWithProof);
//   await updateMetadata(umi, {
//     ...assetWithProof,
//     leafOwner: assetWithProof.leafOwner,
//     currentMetadata: assetWithProof.metadata,
//     updateArgs,
//    }).sendAndConfirm(umi);
// }
