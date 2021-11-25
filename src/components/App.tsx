import React, { lazy, Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";

const Index = lazy(() => import("./pages/Index"));

const App = (): JSX.Element => (
  <ChakraProvider>
    <Suspense fallback={<></>}>
      <Index />
    </Suspense>
  </ChakraProvider>
);

export default App;
