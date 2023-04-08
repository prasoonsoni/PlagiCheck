import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Theme from "./Theme"


import Dashboard from "./pages/Dashboard/Dashboard";
import ResearchPapers from "./pages/Dashboard/ResearchPapers"
import CheckPlagiarism from "./pages/Dashboard/CheckPlagiarism";
import CompletePaper from "./pages/CompletePaper";

const App = () => {
  return (
    <ChakraProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="papers" element={<ResearchPapers />} />
            <Route path="plagiarism" element={<CheckPlagiarism />} />
          </Route>
          <Route path="/paper/:id" element={<CompletePaper />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
