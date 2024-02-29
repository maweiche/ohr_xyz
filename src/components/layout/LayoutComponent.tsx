"use client";
import { ReactNode, useState } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import React from "react";

interface LayoutProps {
  children: ReactNode;
  justifyStyling?: string;
  showNavBar?: boolean;
  showTitle?: string;
  showFooter: boolean;
}

export const LayoutComponent: React.FC<LayoutProps> = ({
  children,
  justifyStyling,
  showNavBar,
  showTitle,
  showFooter,
}) => {
  const [showAboutDialog, setShowAboutDialog] = useState<boolean>(false);

  return (
    <div className="w-full overflow-auto " style={{ height: "100dvh" }}>
      <Header showTitle={showTitle} setShowAboutDialog={setShowAboutDialog} />
      <main className="pt-10 pb-16 min-h-screen">{children}</main>
      {showFooter && <Footer showNavBar={showNavBar} />}
    </div>
  );
};
