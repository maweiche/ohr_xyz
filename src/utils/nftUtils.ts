import { AudioNFT } from "@components/map/NFTModal";
import {
  BREAKPOINT_COORDINATES,
  BREAKPOINT_DESCR,
  BREAKPOINT_NFT_IMG,
  GENERAL_DESCR,
  GENERAL_NFT_IMG,
} from "./constants";

export interface NFTattributes {
  Event: string;
  Location: string;
  Date: string;
  Motivation: string;
  Vibe: string;
  Long: string;
  Lat: string;
}

export const isUserOnBreakpoint = (
  longitude?: number,
  latitude?: number
): boolean => {
  if (!latitude || !longitude) {
    return false;
  }

  let inside = false;

  for (
    let i = 0, j = BREAKPOINT_COORDINATES.length - 1;
    i < BREAKPOINT_COORDINATES.length;
    j = i++
  ) {
    const xi = BREAKPOINT_COORDINATES[i][0];
    const yi = BREAKPOINT_COORDINATES[i][1];
    const xj = BREAKPOINT_COORDINATES[j][0];
    const yj = BREAKPOINT_COORDINATES[j][1];

    const intersect =
      yi < latitude &&
      yj >= latitude &&
      xi <= longitude &&
      xi + ((latitude - yi) / (yj - yi)) * (xj - xi) < longitude;

    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
};

export const createNFT = (
  receiverAddress: string,
  attributes: {
    Event?: string;
    Location?: string;
    Date: string;
    Motivation: string;
    Vibe: string;
    Long?: number;
    Lat?: number;
  },
  recordingUrl: string,
  isOnBreakpoint: boolean
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
        description: isOnBreakpoint ? BREAKPOINT_DESCR : GENERAL_DESCR,
        image: isOnBreakpoint ? BREAKPOINT_NFT_IMG : GENERAL_NFT_IMG,
        animationUrl: recordingUrl,
        externalUrl: "https://ohr-community.xyz",
        receiverAddress: receiverAddress,
        delegated: false,
      }),
    };

    fetch("https://mainnet.underdogprotocol.com/v2/projects/1/nfts", options)
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
    "https://mainnet.underdogprotocol.com/v2/projects/1/nfts?page=1&limit=100",
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
