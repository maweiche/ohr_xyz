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
      className={`w-full mobile-frame overflow-auto`}
      style={{ height: "100dvh" }}
    >
      <AboutDialog
        setShowAboutDialog={setShowAboutDialog}
        showAboutDialog={showAboutDialog}
      />
      <Header showTitle={showTitle} setShowAboutDialog={setShowAboutDialog} />
      <main className="overflow-none" style={{ height: "85dvh" }}>
        {children}
      </main>

      {showFooter && (
        <div style={{ height: "10dvh" }}>
          <Footer showNavBar={showNavBar} />
        </div>
      )}
    </div>
  );
};
