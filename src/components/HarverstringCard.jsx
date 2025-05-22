import React, { useEffect } from "react";
import Container from "./Container";
import PreHarvesting from "./PreHarvesting";
import AfterHarvesting from "./AfterHarvesting";
import { useDataContext } from "../context/useDataContext";

const HarverstringCard = () => {
  const { fetchHarvesting } = useDataContext();

  useEffect(() => {
    fetchHarvesting();
  },[]);
  
  return (
    <Container className="grid grid-cols-12 gap-4 md:gap-6">
      <PreHarvesting />
      <AfterHarvesting />
    </Container>
  );
};

export default HarverstringCard;
