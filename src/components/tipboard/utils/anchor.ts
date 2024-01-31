import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
  } from "@project-serum/anchor";
  // import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
  import { IDL, Tipboard } from "../idl/tipboard";
  import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
  import { useWallet } from "@solana/wallet-adapter-react";
  // Create a connection to the devnet cluster
  export const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });
  
  // Create a placeholder wallet to set up AnchorProvider
  const wallet = Keypair.generate();
  // const { publicKey } = useWallet()
  // Create an Anchor provider
  const provider = new AnchorProvider(connection, wallet as any, {});
  
  // Set the provider as the default provider
  setProvider(provider);
  
  //Battleship Program ID
  const programId = new PublicKey("9KsKHzYzjX5xnQ3FsbN8AmjBmmW2zHcTVvUW9zWqWDZG");
  
  export const program = new Program(
    IDL as Idl,
    programId,
  ) as unknown as Program<Tipboard>;
  
  // GameDataAccount PDA
  export const [globalLevel1GameDataAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("tipboard")], // seed
    programId,
  );
  