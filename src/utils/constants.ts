import { ProtocolOptions } from "@spling/social-protocol";

export const METADATA = {
  name: "Berlinøhr",
  // GIF
  // image:
  //   "https://fiirdkjurnjyohcceepktdga4vva3s7jo5cyqhxvnda2xkcskida.arweave.net/KhERqTSLU4ccQiEeqYzA5WoNy-l3RYge9WjBq6hSUgY?ext=gif",
  image:
    "https://6f6rppqqwzhgdw5wi6ik4uieokb5kxaa2zufucwquqhg63e3ss3q.arweave.net/8X0XvhC2TmHbtkeQrlEEcoPVXADWaFoK0KQOb2yblLc?ext=png",
  description:
    "Moments are temporary. Memories are forever. This is your special sound from the Hacker House Berlin 2023.",
  external_url: "https://www.x.com/ohr_xyz",
  sellerFeeBasisPoints: 500, //500 bp = 5%
  symbol: "ØHR",
};

export const options = {
  rpcUrl:
    "https://devnet.helius-rpc.com/?api-key=4ca65c1f-7b30-4387-b937-acc01dc63653",
  useIndexer: true,
} as ProtocolOptions;
