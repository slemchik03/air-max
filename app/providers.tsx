"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { FC, useState } from "react";
import { Toaster } from "react-hot-toast";
interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const [client, setClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <Toaster containerStyle={{ zIndex: 10002 }} />
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
};

export default Providers;
