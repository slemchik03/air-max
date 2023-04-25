import { FC } from "react";
import Header from "../Header/Header";

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
        </>
    );
}

export default Layout;