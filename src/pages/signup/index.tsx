import { LayoutComponent } from "@components/layout/LayoutComponent";
import { Profile } from "@components/signup/Profile";
import React from "react";

const Signup = () => {
  return (
    <LayoutComponent showWallet="none">
      <Profile />
    </LayoutComponent>
  );
};

export default Signup;
