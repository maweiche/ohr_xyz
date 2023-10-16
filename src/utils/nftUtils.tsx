import { AudioNFT } from "@components/map/MapView";

export interface NFTattributes {
  Event: string;
  Location: string;
  Date: string;
  Motivation: string;
  Vibe: string;
  Long: string;
  Lat: string;
}

export const createNFT = (
  receiverAddress: string,
  attributes: {
    Event: string;
    Location: string;
    Date: string;
    Motivation: string;
    Vibe: string;
    Long: string;
    Lat: string;
  },
  recordingUrl: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
      },
      body: JSON.stringify({
        attributes: attributes,
        name: "øhr",
        symbol: "ØHR",
        description: "I minted this NFT at the Solana Hacker House.",
        image:
          "https://shdw-drive.genesysgo.net/CihGZb6sJ94yrPDfQ2ABC7ZeUQam8ChY19p7PSSs1avA/ohr-logo.jpeg",
        animationUrl: recordingUrl,
        externalUrl: "https://ohr-community.xyz",
        receiverAddress: receiverAddress,
        delegated: false,
      }),
    };

    fetch("https://devnet.underdogprotocol.com/v2/projects/3/nfts", options)
      .then((response) => response.json())
      .then((response) => {
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        resolve(false);
      });
  });
};

export const getNFTs = (
  setAudioNFTs: React.Dispatch<React.SetStateAction<AudioNFT[] | undefined>>
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
    },
  };

  fetch(
    "https://devnet.underdogprotocol.com/v2/projects/3/nfts?page=1&limit=100",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setAudioNFTs(response.results);
    })
    .catch((err) => console.error(err));
};

// API CALL FOR PROTECTED .ENV FILE

// export const createNFT = async (
//   receiverAddress: string,
//   attributes: {
//     Event: string;
//     Location: string;
//     Date: string;
//     Motivation: string;
//     Vibe: string;
//     Long: string;
//     Lat: string;
//   },
//   recordingUrl: string
// ): Promise<boolean> => {
//   try {
//     const response = await fetch("/api/nft", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         receiverAddress,
//         attributes,
//         recordingUrl,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return true;
//     } else {
//       console.error("Failed to create NFT");
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };
