import { Upload } from "@mux/mux-node";

export const createMuxUpload = async (audioBlob: Blob): Promise<string> => {
  // upload asset and get uploadUrl
  const response = await fetch(`/api/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const initialData = await response.json();
  const uploadUrl = initialData.url;

  // upload audioBlob to asset endpoint (uploadUrl)
  await fetch(uploadUrl, {
    method: "PUT",
    body: audioBlob,
    headers: { "content-type": audioBlob.type },
  });

  return initialData.id;
};

export const waitFor = async (seconds: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * 1000);
  });
};

export const getMuxAssetId = async (uploadId: string): Promise<string> => {
  const res = await fetch(`/api/upload/?uploadId=${uploadId}`, {
    method: "GET",
  });
  const data = (await res.json()) as Upload;
  if (data.status === "waiting") {
    await waitFor(1);
    return getMuxAssetId(uploadId);
  }

  if (data.status !== "asset_created") {
    throw new Error(
      data.error?.message ?? "Something went wrong uploading the asset."
    );
  }

  if (!data.asset_id) {
    throw new Error("Upload does not contain asset id.");
  }
  return data.asset_id;
};

export const getPlaybackId = async (assetId: string) => {
  const response = await fetch(`/api/playback?assetId=${assetId}`);
  const data = await response.json();
  return data;
};
