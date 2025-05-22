import React from "react";
import Navbar from "./components/Navbar";
import NoteAndDisclaimers from "./components/NoteAndDisclaimers";
import Container from "./components/Container";
import HarverstringCard from "./components/HarverstringCard";
import HoldingCard from "./components/HoldingCard";
import { DataProvider } from "./context/useDataContext";

const App = () => {
  return (
    <DataProvider>
      <section className="bg-bgclr min-h-screen space-y-4">
        <Navbar />
        <Container className="flex gap-4">
          <h1 className="text-font-primary text-2xl leading-[30px]">
            Tax Harvesting
          </h1>
          <p className="text-[#4A78FF] underline">How it works?</p>
        </Container>
        <NoteAndDisclaimers />
        <HarverstringCard />
        <HoldingCard />
      </section>
    </DataProvider>
  );
};

export default App;
