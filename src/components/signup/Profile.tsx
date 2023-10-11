import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useWallet } from "@solana/wallet-adapter-react";
import { convertBase64 } from "utils/formatUtils";
import defaultProfilePic from "../../assets/💅-5.png";
import { StaticImageData } from "next/image";

export const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(
    defaultProfilePic
  );
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const wallet = useWallet();

  const handleClick = async () => {
    // if (!wallet || typeof wallet == "undefined")
    //   return toast.error("Wallet not connected");
    // if (!username) return toast.error("Please enter a username");
    // if (!profileImageFile) return toast.error("Please upload a profile image");
    // if (!profileDescription)
    //   return toast.error("Please enter a profile description");
    // const toastID = toast.loading(
    //   "Creating your profile. This may take a while..."
    // );
    // try {
    //   let bs64 = await convertBase64(selectedImage);
    //   let finalObj = {
    //     base64: bs64,
    //     size: selectedImage.size,
    //     type: selectedImage.type,
    //   };
    //   const user = await socialProtocol.createUser(
    //     username,
    //     finalObj,
    //     profileDescription
    //   );
    //   if (user) {
    //     // toast.dismiss(toastID);
    //     // toast.success("Profile created successfully");
    //     //after 2 seconds redirect to home
    //     // setTimeout(() => {
    //     //   SplingContextValue.updateSelfInfo(user);
    //     //   navigate("/");
    //     // }, 2000);
    //   } else {
    //     // toast.dismiss(toastID);
    //     // toast.error("Something went wrong");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   //   toast.dismiss(toastID);
    //   //   toast.error(`Something went wrong. Please Try again.${err}`);
    // }
  };

  return (
    <div className="flex flex-col justify-between align-center w-full h-full mt-2 items-center">
      <h2 className="text-xl">Create Profile</h2>
      <ImageUpload
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <div className="flex flex-col align-center justify-between items-center self-center">
        <div className="flex flex-col">
          <p className="mb-2">Username</p>
          <input
            className="input input-bordered placeholder-purple-200 rounded-xl w-full bg-purple-300/30 border-purple-300"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <p className="mb-2">Bio</p>
          <textarea
            className="textarea textarea-bordered rounded-xl placeholder-purple-200 bg-purple-300/30 border-purple-300 "
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-6">
          <button
            className="btn bg-purple-900/30 border-2 txt-secondary color-secondary rounded-xl"
            onClick={handleClick}
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};
