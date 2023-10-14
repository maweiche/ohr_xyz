import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useWallet } from "@solana/wallet-adapter-react";
import { convertBase64 } from "utils/formatUtils";
import defaultProfilePic from "../../assets/💅-5.png";
import { protocolOptions } from "utils/constants";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { SocialProtocol } from "@spling/social-protocol";

export const Profile = () => {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [profilePicFile, setProfilePicFile] = useState<File | undefined>(
    undefined
  );

  const wallet = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   async function initApp() {
  //     const socialProtocolVal = await new SplingProtocol(
  //       wallet,
  //       null,
  //       protocolOptions
  //     ).init();
  //     setSocialProtocol(socialProtocolVal);
  //   }
  //   if (wallet?.publicKey && typeof wallet !== "undefined") {
  //     initApp();
  //   }
  // }, [wallet]);

  // const updateProfile = async () => {
  //   // error handling
  //   if (!wallet || typeof wallet == "undefined")
  //     return toast.error("Wallet not connected");

  //   if (!username) return toast.error("Please enter a username");

  //   if (!profilePicFile) return toast.error("Please upload a profile pic");

  //   if (!bio) return toast.error("Please enter a bio");

  //   const toastID = toast.loading(
  //     "Creating your profile. This may take a while..."
  //   );

  //   try {
  //     let bs64 = await convertBase64(profilePicFile);
  //     let finalImageObj: FileData | FileUriData;

  //     if (profilePicFile instanceof File) {
  //       finalImageObj = {
  //         base64: bs64,
  //         size: profilePicFile.size,
  //         type: profilePicFile.type,
  //       };
  //       console.log("finalImageObj is File, size: ", finalImageObj.size);
  //     } else {
  //       console.log("finalImageObj is StaticImg");
  //       finalImageObj = {
  //         base64: bs64,
  //         size: 100,
  //         type: "image/png",
  //       };
  //     }

  //     if (socialProtocol !== null) {
  //       console.log("Social Protocol: ", socialProtocol);
  //       const user = await x.createUser(
  //         username,
  //         finalImageObj,
  //         bio
  //       );
  //       console.log(user);
  //       if (user) {
  //         console.log(user);
  //         toast.dismiss(toastID);
  //         toast.success("Profile created successfully");
  //         //   after 2 seconds redirect to home
  //         setTimeout(() => {
  //           // SplingContextValue.updateSelfInfo(user);
  //           router.push("/home");
  //         }, 2000);
  //       } else {
  //         console.log("no user");
  //         toast.dismiss(toastID);
  //         toast.error("Something went wrong");
  //       }
  //     }
  //   } catch (err) {
  //     console.log("got to error");
  //     //   socialProtocol?.getUser();
  //     console.log("Social Protocol after user creation: ", socialProtocol);
  //     console.log(err);
  //     console.error("Server response: ", err);
  //     toast.dismiss(toastID);
  //     toast.error(`Something went wrong. Please try again.${err}`);
  //   }
  // };

  return (
    <div className="flex flex-col justify-between align-center w-full h-full mt-2 items-center">
      <h2 className="text-xl">Create Profile</h2>
      <ImageUpload
        profilePicFile={profilePicFile}
        setProfilePicFile={setProfilePicFile}
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
            // onClick={updateProfile}
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};
