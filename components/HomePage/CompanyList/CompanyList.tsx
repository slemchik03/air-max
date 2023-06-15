"use client";

import CompanyListItems from "./CompanyListItems";
import { useCallback, useEffect, useState } from "react";
import CompanyListItemsMobile from "./CompanyListItemsMobile";

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

  return isMobile ? (
    <div className="relative">
      <CompanyListItemsMobile />
    </div>
  ) : (
    <CompanyListItems />
  );
};
export default CompanyList;
