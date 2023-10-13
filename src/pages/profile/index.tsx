import Layout from "@components/layout/Layout";
import { Collection } from "@components/profile/Collection";
import { UserInfo } from "@components/profile/UserInfo";
import React from "react";

const Profile: React.FC = () => {
  return (
    <Layout showWallet="none" justifyStyling="start">
      <UserInfo />
      <Collection />
    </Layout>
  );
};

export default Profile;
