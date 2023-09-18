export async function dataUrlToBytes(dataUrl: any) {
  try {
    const res = await fetch(dataUrl);
    return new Uint8Array(await res.arrayBuffer());
  } catch (error) {
    console.error("Error creating Uint8Array from data URL:", error);
    throw error;
  }
}

export function objToBytes(obj: any) {
  const valuesArray: number[] = Object.values(obj);
  const uint8Array: Uint8Array = new Uint8Array(valuesArray);
  return uint8Array;
}
