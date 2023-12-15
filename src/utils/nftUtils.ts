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

export const getNFTdetails = (nftID: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
    },
  };

  fetch(
    `https://devnet.underdogprotocol.com/v2/projects/6/nfts/${nftID}`,
    options
  )
    // fetch(
    //   `https://mainnet.underdogprotocol.com/v2/projects/1/nfts/${nftID}`,
    //   options
    // )
    .then((response) => response.json())
    .then((response) => response.ownerAddress)
    .catch((err) => console.error(err));
};
