import { ReactNode, useState } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import AboutDialog from "@components/landing/AboutDialog";

interface LayoutProps {
  showWallet: "footer" | "header" | "none";
  children: ReactNode;
  justifyStyling?: string;
  showLogo?: boolean;
  showTitle?: string;
}

export const LayoutComponent: React.FC<LayoutProps> = ({
  children,
  showWallet,
  justifyStyling,
  showLogo,
  showTitle,
}) => {
  const [showAboutDialog, setShowAboutDialog] = useState<boolean>(false);

  return (
    <div
      className={`flex justify-between w-full h-full flex-col mobile-frame`}
      style={{ height: "100svh" }}
    >
      <AboutDialog
        setShowAboutDialog={setShowAboutDialog}
        showAboutDialog={showAboutDialog}
      />
      <Header showTitle={showTitle} setShowAboutDialog={setShowAboutDialog} />
      <main
        className={`overflow-none h-full flex flex-col justify-${
          justifyStyling ? justifyStyling : "center"
        } md:mt-0 md:flex-grow md:flex md:justify-center md:items-center`}
      >
        {children}
      </main>

      <Footer showWallet={showWallet} />
    </div>
  );
};
