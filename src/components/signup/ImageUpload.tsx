import React, { FC, ChangeEvent, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import defaultProfilePic from "../../assets/💅-5.png";
import { toast } from "sonner";

interface ImageUploadProps {
  profilePicFile: File | undefined;
  setProfilePicFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  profilePicFile,
  setProfilePicFile,
}) => {
  const [fileName, setFileName] = useState<string>("upload avatar");
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    defaultProfilePic
  );

  // useEffect(() => {
  //   return () => {
  //     if (
  //       typeof profilePic === "string" &&
  //       profilePic !== defaultProfilePic.src
  //     ) {
  //       URL.revokeObjectURL(profilePic);
  //     }
  //   };
  // }, [profilePic]);

  // useEffect(() => {
  //   let currentImageSrc: string;
  //   if (profilePicFile instanceof File) {
  //     currentImageSrc = URL.createObjectURL(profilePic);
  //     setImageSrc(currentImageSrc);
  //   } else {
  //     setImageSrc((profilePic as StaticImageData).src);
  //   }

  //   return () => {
  //     if (profilePic instanceof File) {
  //       URL.revokeObjectURL(currentImageSrc);
  //     }
  //   };
  // }, [profilePic]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return toast.error("Please select a file");
    if (file.size > 1000000) return toast.error("File size too large");
    if (!file.type.includes("image"))
      return toast.error("Please upload an image file");

    setImageSrc(URL.createObjectURL(file));
    console.log(file);

    setProfilePicFile(file);

    setFileName(file.name);
  };

  return (
    <div className="avatar flex flex-col justify-center items-center">
      <div className="w-44 h-44 rounded-full ring overflow-hidden">
        <Image
          src={imageSrc}
          alt="User Profile Picture"
          width={176}
          height={176}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="fileInput"
        className="hidden"
      />
      <label
        htmlFor="fileInput"
        className="mt-2 flex flex-col text-sm text-center self-center bg-purple-900/30 border-2 border-purple-300 cursor-pointer p-2 rounded-xl"
      >
        {fileName}
      </label>
    </div>
  );
};

export default ImageUpload;
