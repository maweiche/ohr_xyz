"use client";
import Toaster from "../../components/Toaster";
import { ContactForm } from "../../components/contact/ContactForm";
import { GDPR } from "../../components/contact/GDPR";
import { LayoutComponent } from "../../components/layout/LayoutComponent";
import React, { useState } from "react";

const ContactComponent = () => {
  const [showGDPR, setShowGDPR] = useState<boolean>(false);
  const [isSent, setIsSent] = useState(false);

  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="Contact"
      showFooter={true}
    >
      <div className="flex flex-col mx-5 items-center align-center justify-center h-full overflow-scroll">
        <Toaster />
        {showGDPR ? (
          <GDPR handleOnClose={() => setShowGDPR(false)} />
        ) : (
          <ContactForm
            setShowGDPR={setShowGDPR}
            isSent={isSent}
            setIsSent={setIsSent}
          />
        )}
      </div>
    </LayoutComponent>
  );
};

export default ContactComponent;
