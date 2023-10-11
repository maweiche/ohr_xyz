import React, { FC, ChangeEvent, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import defaultProfilePic from "../../assets/💅-5.png";

interface ImageUploadProps {
  selectedImage: string | StaticImageData;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<string | StaticImageData>
  >;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const [fileName, setFileName] = useState<string>("upload avatar");

  useEffect(() => {
    return () => {
      // Clean up function to revoke object URLs created (to avoid memory leaks)
      if (
        typeof selectedImage === "string" &&
        selectedImage !== defaultProfilePic.src
      ) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div className="avatar flex flex-col justify-center items-center">
      <div className="w-44 h-44 rounded-full ring overflow-hidden">
        <Image
          src={selectedImage as string | StaticImageData}
          alt="User Profile Picture"
          width={176}
          height={176}
          unoptimized={typeof selectedImage === "string"}
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
