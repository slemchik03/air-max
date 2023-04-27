import { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default Layout;