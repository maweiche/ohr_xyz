import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export const dynamic = "force-dynamic";
const MUX_API_BASE_URL = "https://api.mux.com/video/v1/assets/";

// export async function GETT(request: NextRequest) {
//   const { Video } = new Mux();
//   console.log("in get playback ro");

//   const searchParams = request.nextUrl.searchParams;
//   const assetId = searchParams.get("assetId");
//   console.log("Asset id: ", assetId);

//   if (typeof assetId === "string") {
//     try {
//       const data = await Video.Assets.createPlaybackId(assetId, {
//         policy: "public",
//       });
//       const audioUrl = `https://stream.mux.com/${data.id}/audio.m4a`;

//       return NextResponse.json(audioUrl);
//     } catch (e) {
//       return NextResponse.json({ error: "Error creating upload", e });
//     }
//   } else {
//     return NextResponse.json({ error: "Invalid uploadId" });
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assetId = searchParams.get("assetId");

    console.log(assetId);
    if (assetId) {
      const response = await fetch(
        MUX_API_BASE_URL + assetId + "/playback-ids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${process.env.NEXT_PUBLIC_MUX_TOKEN_ID}:${process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      // curl https://api.mux.com/video/v1/assets/${ASSET_ID}/playback-ids
      // https://api.mux.com/video/v1/assets/e02roC8xPfBJ01wMA1HAFq9MMmjw00y2yQZN00vlaUuKRPg/playback-ids
      console.log("response::::", response);

      const data = await response.json();
      console.log("data in get playback id handler: ", data);
      // const audioUrl = `https://stream.mux.com/${data.id}/audio.m4a`;

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Invalid uploadId" });
    }
  } catch (e) {
    return NextResponse.json({ error: "Error Video Upload" });
  }
}

// /api/playback/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import fetch from "node-fetch";

// export async function GET(request: NextRequest) {
//   console.log("IN THE ENDPOINT");
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const assetId = searchParams.get("assetId");

//     console.log("assetId", assetId);

//     if (assetId) {
//       const MUX_API_BASE_URL = `https://api.mux.com/video/v1/playback-ids/${assetId}`;

//       const response = await fetch(MUX_API_BASE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Basic ${Buffer.from(
//             `${process.env.NEXT_PUBLIC_MUX_TOKEN_ID}:${process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET}`
//           ).toString("base64")}`,
//         },
//         body: JSON.stringify({
//           policy: "public",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const audioUrl = `https://stream.mux.com/${data.data.id}/audio.m4a`;

//       return NextResponse.json({ audioUrl });
//     } else {
//       return NextResponse.json({ error: "Invalid assetId" });
//     }
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: "Error creating playback URL" });
//   }
// }
