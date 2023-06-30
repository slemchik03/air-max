"use client";

import { isHideHeaderAtom } from "@/components/General/Header/HeaderContent";
import SearchItems from "@/components/General/Modals/SearchItems/SearchItems";
import { useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const setIsHideHeader = useSetAtom(isHideHeaderAtom);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    setIsHideHeader(true);
    return () => setIsHideHeader(false);
  }, []);

  return (
    <SearchItems
      closeCallback={() => router.back()}
      open={pathname === "/search"}
    />
  );
}
