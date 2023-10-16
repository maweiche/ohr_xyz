import { LayoutComponent } from "@components/layout/LayoutComponent";
import { Collection } from "@components/profile/Collection";
import { UserInfo } from "@components/profile/UserInfo";
import React from "react";

const Profile: React.FC = () => {
  return (
    <LayoutComponent showWallet="none" justifyStyling="start">
      <UserInfo />
      <Collection />
    </LayoutComponent>
  );
};

export default Profile;
