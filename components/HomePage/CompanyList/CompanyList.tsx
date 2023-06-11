"use client";

import Marquee from "react-fast-marquee";
import CompanyListItems from "./CompanyListItems";
import { useCallback, useEffect, useState } from "react";

const CompanyList = () => {
  const [isMobile, setIsMobile] = useState(true);
  const changeStatus = useCallback(
    (e: MediaQueryListEvent) => setIsMobile(e.matches),
    []
  );

  useEffect(() => {
    const matchMobileMedia = window.matchMedia("(max-width: 768px)");

    setIsMobile(matchMobileMedia.matches);

    matchMobileMedia.addEventListener("change", changeStatus);

    return () => {
      matchMobileMedia.removeEventListener("change", changeStatus);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <Marquee>
          <CompanyListItems />
        </Marquee>
      ) : (
        <div className="flex relative left-0 justify-center mt-10 h-[150px]">
          <CompanyListItems />
        </div>
      )}
    </>
  );
};
export default CompanyList;
