import { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center">
      {/* @ts-ignore */}
      <Header />
      <div className="mx-auto min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
