import { useState } from "react";
import {
  Connection,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

type TipCreatorBtnProps = {
  owner: string;
};

export default function TipCreatorBtn({ owner }: TipCreatorBtnProps) {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);

  const mainRpcEndpoint = `https://api.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_RPC!}`;
  const devnetRpcEndpoint = `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_RPC!}`;
  const connection = new Connection(devnetRpcEndpoint, "confirmed");

  async function tipCreator() 
  {
    try {
      console.log('tipCreator', amount, publicKey, owner)
      const res = await fetch("/api/tip", {
        method: "POST",
        body: JSON.stringify({ 
          publicKey: publicKey?.toBase58(),
          amount: amount,
          owner: owner,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const txData = await res.json();
      const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
      const txHash = await sendTransaction(tx, connection);

      console.log(
        "\nTip Sent:",
        `https://explorer.solana.com/tx/${txHash}?cluster=devnet-solana`,
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (

      <form
        onSubmit={(e) =>{
          if (amount > 0) {
            e.preventDefault(),
            tipCreator();
          } else {
            alert("Please enter an amount");
          }
        }
        }
        className="border m-1 px-2 rounded"
      >
        <input 
          type="float"
          placeholder="Amount"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border-none bg-transparent w-20 focus:outline-none"
        />
        <button type="submit">
          TIP
        </button>
      </form>
  );
}