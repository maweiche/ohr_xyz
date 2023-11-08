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
        description: GENERAL_DESCR,
        image: GENERAL_NFT_IMG,
        animationUrl: recordingUrl,
        externalUrl: "https://ohr-community.xyz",
        receiverAddress: receiverAddress,
        delegated: false,
      }),
    };

    // fetch("https://mainnet.underdogprotocol.com/v2/projects/1/nfts", options)
    fetch("https://devnet.underdogprotocol.com/v2/projects/6/nfts", options)
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

export const getNFTs = async (
  setAudioNFTs: React.Dispatch<React.SetStateAction<AudioNFT[] | undefined>>,
  initialPageNumber: number
) => {
  let pageNumber = initialPageNumber;
  const limit = 100;
  // const apiUrl = `https://mainnet.underdogprotocol.com/v2/projects/1/nfts`;
  const apiUrl = `https://devnet.underdogprotocol.com/v2/projects/6/nfts`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
    },
  };

  // Create a set to store existing IDs
  const existingIds = new Set<number>();

  try {
    while (true) {
      const response = await fetch(
        `${apiUrl}?page=${pageNumber}&limit=${limit}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results.length > 0) {
        // Filter out items with existing IDs before adding to the state
        const filteredResults = data.results.filter(
          (result: AudioNFT) => !existingIds.has(result.id)
        );

        setAudioNFTs((prevAudioNFTs: AudioNFT[] | undefined) =>
          prevAudioNFTs
            ? [...prevAudioNFTs, ...filteredResults]
            : filteredResults
        );

        // Add the new IDs to the set
        filteredResults.forEach((result: AudioNFT) =>
          existingIds.add(result.id)
        );

        pageNumber++;
      } else {
        // No more data to fetch, exit the loop
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getNFTdetails = (nftID: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
    },
  };

  // fetch(
  //   `https://mainnet.underdogprotocol.com/v2/projects/1/nfts/${nftID}`,
  //   options
  // )
  fetch(
    `https://devnet.underdogprotocol.com/v2/projects/6/nfts/${nftID}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.ownerAddress)
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
