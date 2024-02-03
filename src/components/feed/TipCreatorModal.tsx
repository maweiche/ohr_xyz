/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import { IDL, Tipboard } from "../tipboard/idl/tipboard";
import * as anchor from "@project-serum/anchor";
import BN from "bn.js";

interface TipCreatorModalProps {
  showModal: boolean;
  owner: string;
  mintAddress: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TipCreatorModal: React.FC<TipCreatorModalProps> = ({
  showModal,
  owner,
  mintAddress,
  setShowModal,
}) => {
  const [isOpen, setIsOpen] = useState(showModal);
  const [amount, setAmount] = useState(0);
  const [isTxSuccessful, setIsTxSuccessful] = useState<boolean | undefined>(
    undefined
  );

  const ownerShort =
    owner.substring(0, 3) + "..." + owner.substring(owner.length - 3);

  const { publicKey, sendTransaction } = useWallet();
  const router = useRouter();

  const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
  const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const connection = new Connection(devnetRpcEndpoint!, "confirmed");

  // TIP PROGRAM FUNCTIONS
  const provider = new AnchorProvider(connection, useWallet() as any, {});
  setProvider(provider);

  const programId = new PublicKey(
    "7vZPMfghSw2rQWhvCs1XW6CDLunP36jB253bQVWWMUmu"
  );
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<Tipboard>;

  const [tipboardAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("tipboard")],
    program.programId
  );
  // console.log("tipboard account", tipboardAccount.toString());
  const [tipboard] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("tipboard"), new PublicKey(owner).toBuffer()],
    program.programId
  );
  // console.log("tipboard account", tipboard.toString());
  // addTip
  async function addTip() {
    const tipAmount = new BN(amount * LAMPORTS_PER_SOL);
    const timestamp = new BN(Date.now());

    const tx = await program.methods
      .addTip(tipAmount, timestamp, mintAddress!.toString())
      .accounts({
        tipboard: tipboard!,
        to: new PublicKey(owner),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: txHash,
    });

    console.log("txHash", txHash);
    setIsTxSuccessful(true);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount > 0) {
      await addTip();
    } else {
      alert("Please enter an amount");
    }
  };

  const handleClickTipBoard = () => {
    router.push(`/tipboard?owner=${owner}`);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(value as any) && value !== "") {
      setAmount(parseFloat(value));
    } else {
      setAmount(0);
    }
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setShowModal(false);
        }}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {isTxSuccessful === undefined
              ? renderTipForm("success")
              : isTxSuccessful
              ? renderSuccessMessage()
              : renderErrorMessage()}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );

  function renderTipForm(type: "success" | "error") {
    return (
      <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-[#5a1a52] text-[#FFD1EA] border-2 border-[#9D58B2] p-5 shadow-lg">
        <Dialog.Title className="text-xl font-bold">
          {type !== "error"
            ? "Enjoying this sound?"
            : "Something went wrong :("}
        </Dialog.Title>
        <Dialog.Description className="mt-1 text-center">
          {type !== "error" ? "Tip your creator." : "Give it another go"}
        </Dialog.Description>
        {publicKey ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            <input
              type="number"
              step="any"
              placeholder="Amount"
              onChange={handleAmountChange}
              className="border-none text-lg text-[#FFD1EA] text-center placeholder-[#d57ba8] bg-transparent w-20 focus:outline-none focus:ring-0 focus:border-transparent m-1 p-1 self-center"
            />
            <button
              type="submit"
              className="rounded-md px-4 py-2 bg-[#61356e] active:bg-[#5a1a52] active:border-[#9D58B2] border-1 shadow-lg"
            >
              TIP
            </button>
          </form>
        ) : (
          <div className="flex justify-center mt-4">
            <WalletMultiButton />
          </div>
        )}
      </Dialog.Panel>
    );
  }

  function renderSuccessMessage() {
    return (
      <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-[#5a1a52] text-[#FFD1EA] border-2 border-[#9D58B2] p-3 py-5 shadow-lg flex flex-col justify-center">
        <Dialog.Title className="text-xl font-bold text-center">
          👏
        </Dialog.Title>
        <Dialog.Description className="mt-1 mx-4 text-center">
          You've successfully sent {amount} to {ownerShort}
        </Dialog.Description>
        <button
          onClick={handleClickTipBoard}
          className="border-2 text-[#81be5d] border-[#6bb242] self-center mt-5 rounded-xl p-2"
        >
          CHECK THE TIPBOARD
        </button>
      </Dialog.Panel>
    );
  }

  function renderErrorMessage() {
    return renderTipForm("error");
  }
};

export default TipCreatorModal;
