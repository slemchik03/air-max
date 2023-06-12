"use client";

import { FC } from "react";
import { useHydrateAtoms } from "jotai/utils";

interface Props {
  children: React.ReactNode;
  initialValues: any;
}

const HydrateAtoms: FC<Props> = ({ children, initialValues }) => {
  useHydrateAtoms(initialValues);

  return <>{children}</>;
};

export default HydrateAtoms;
