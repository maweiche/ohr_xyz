import { ReactNode } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

interface LayoutProps {
  showWallet: "footer" | "header" | "none";
  children: ReactNode;
  justifyStyling?: string;
  showLogo?: boolean;
  showTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showWallet,
  justifyStyling,
  showLogo,
  showTitle,
}) => {
  return (
    <div
      className={`flex justify-between w-full h-full flex-col mobile-frame p-4`}
      style={{ height: "100svh" }}
    >
      {/* <Image src="/phone-frame.png" width={100} height={300} /> */}
      <Header showTitle={showTitle} />
      <main
        className={`overflow-none h-full flex flex-col justify-${
          justifyStyling ? justifyStyling : "center"
        } md:mt-0 md:flex-grow md:flex md:justify-center md:items-center`}
      >
        {children}
      </main>

      <Footer showWallet={showWallet} showLogo={showLogo} />
    </div>
  );
};

export default Layout;
