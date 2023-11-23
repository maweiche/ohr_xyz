import { LayoutComponent } from "@components/layout/LayoutComponent";
import { Instagram } from "@components/layout/footer/icons/Instagram";
import { OhrLogo } from "@components/layout/footer/icons/OhrLogo";
import { Tiktok } from "@components/layout/footer/icons/Tiktok";
import { Twitter } from "@components/layout/footer/icons/twitter";
import React from "react";

const ContactScreen = () => {
  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Contact"
      showFooter={false}
    >
      <div className="flex flex-col gap-6 m-5 items-center justify-center h-full">
        <h2 className="text-xl">Want to stay in touch?</h2>
        <p className="text-md text-center">
          Follow along or join our community
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center mt-3 gap-4">
            <Twitter />
            <Instagram />
            <Tiktok />
          </div>
        </div>
        <OhrLogo />
      </div>
    </LayoutComponent>
  );
};

export default ContactScreen;
