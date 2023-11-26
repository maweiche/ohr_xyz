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

      {showFooter && <Footer showNavBar={showNavBar} />}
    </div>
  );
};
