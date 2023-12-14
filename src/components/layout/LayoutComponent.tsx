"use client";
import { ReactNode, useState } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import AboutDialog from "@components/landing/AboutDialog";

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
    <div
      className="w-full mobile-frame overflow-auto grid grid-rows-10 grid-cols-1 gap-16"
      style={{ height: "100dvh" }}
    >
      <div className="col-span-1 row-span-1">
        <Header showTitle={showTitle} setShowAboutDialog={setShowAboutDialog} />
      </div>
      <div className="col-span-1 row-start-2 row-span-6">
        <main className="overflow-none h-full">{children}</main>
      </div>
      <div className="col-span-1 row-start-8 row-span-1">
        {showFooter && <Footer showNavBar={showNavBar} />}
      </div>
    </div>
  );
};
