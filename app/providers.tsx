"use client";

import { Provider } from "jotai";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

const Providers: FC<Props> = ({ children }) => {
  return (

      <QueryClientProvider client={client}>
        <Toaster containerStyle={{zIndex: 10002}} />
        <Provider>{children}</Provider>
      </QueryClientProvider>
  );
};

export default Providers;
