import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Index from "./pages/Index";

const App = (): JSX.Element => (
  <ChakraProvider>
    <Index />
  </ChakraProvider>
);

export default App;
