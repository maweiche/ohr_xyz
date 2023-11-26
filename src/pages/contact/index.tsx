import Toaster from "@components/Toaster";
import { ContactForm } from "@components/contact/ContactForm";
import { GDPR } from "@components/contact/GDPR";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { Instagram } from "@components/layout/footer/icons/Instagram";
import { OhrLogo } from "@components/layout/footer/icons/OhrLogo";
import { Tiktok } from "@components/layout/footer/icons/Tiktok";
import { Twitter } from "@components/layout/footer/icons/twitter";
import React, { useState } from "react";

const ContactScreen = () => {
  const [showGDPR, setShowGDPR] = useState<boolean>(false);
  const [startSecondAnimation, setStartSecondAnimation] =
    useState<boolean>(false);
  const [isSent, setIsSent] = useState(false);

  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="Contact"
      showFooter={true}
    >
      <div className="flex flex-col m-5 items-center align-center justify-center h-full overflow-scroll">
        <Toaster />
        {showGDPR ? (
          <GDPR handleOnClose={() => setShowGDPR(false)} />
        ) : (
          <div className="w-full max-w-md ">
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-3xl text-center">Want to stay in touch?</h2>
              <p className="text-md my-2 text-center self-center">
                Follow along or join our closed community
              </p>
            </div>
            <ContactForm
              setShowGDPR={setShowGDPR}
              isSent={isSent}
              setIsSent={setIsSent}
            />
          </div>
        )}
        {/* <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center mt-3 gap-4">
            <Twitter />
            <Instagram />
            <Tiktok />
          </div>
        </div>
        <OhrLogo /> */}
      </div>
    </LayoutComponent>
  );
};

export default ContactScreen;
