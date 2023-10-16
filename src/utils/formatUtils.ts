import { StaticImageData } from "next/image";

export const getCurrentDateFormatted = (): string => {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const year = now.getFullYear();
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const shortMonth = shortMonths[now.getMonth()];

  return `${day} ${shortMonth} ${year} ${hours}:${minutes}`;
};

export const getFirstArrayElementOrValue = (
  value?: string | string[]
): string | undefined => {
  if (typeof value === "undefined") {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
};

export const convertBase64 = (
  file: File | StaticImageData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    } else if (typeof file === "object" && "src" in file) {
      resolve(file.src);
    } else {
      reject("Invalid input: Expected a File or StaticImageData object.");
    }
  });
};

export const timeStampToTimeAgo = (p_timeStampNanoSeconds: number): string => {
  const milliseconds: number = p_timeStampNanoSeconds / 1000000;
  const durationUntilNowInMilliseconds: number =
    new Date().getTime() - milliseconds;
  const durationInMinutes: number = durationUntilNowInMilliseconds / 1000 / 60;

  if (durationInMinutes < 60) return Math.floor(durationInMinutes) + "m";

  const durationInHours: number = durationInMinutes / 60;
  if (durationInHours < 24) return Math.floor(durationInHours) + "h";

  const durationInDays: number = durationInHours / 24;
  return Math.floor(durationInDays) + "d";
};

export const extractPlayBackIdFromUrl = (url: string): string | null => {
  const regex = /\.com\/(.*?)\/audio\.m4a/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
