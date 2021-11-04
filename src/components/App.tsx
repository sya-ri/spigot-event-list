import React, { lazy, Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Paths from "../Paths";

const Index = lazy(() => import("./pages/Index"));

const App = (): JSX.Element => (
  <ChakraProvider>
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.Index} element={<Index />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </ChakraProvider>
);

export default App;
