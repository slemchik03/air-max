"use client";

import { Provider } from "jotai";
import { FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const [client, setClient] = useState(new QueryClient())
  return (

      <QueryClientProvider client={client}>
        <Toaster containerStyle={{zIndex: 10002}} />
        <Provider>{children}</Provider>
      </QueryClientProvider>
  );
};

export default Providers;
