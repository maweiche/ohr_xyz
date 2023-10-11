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

export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
