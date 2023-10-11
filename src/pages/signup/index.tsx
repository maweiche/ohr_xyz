import Layout from "@components/layout/Layout";
import { Profile } from "@components/signup/Profile";
import React from "react";

const Signup = () => {
  return (
    <Layout showWallet="none">
      <Profile />
    </Layout>
  );
};

export default Signup;
