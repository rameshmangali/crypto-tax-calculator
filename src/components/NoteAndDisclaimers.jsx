import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Container from "./Container";

const disclaimerTestList = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term/long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted",
];

const NoteAndDisclaimers = () => {
  const [expand, setExpand] = useState(false);
  return (
    <Container>
      <div className="border-hightlight border rounded-lg bg-[#121D3A] px-3 py-2">
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IoIosInformationCircleOutline className="text-hightlight text-2xl" />
            <p className="text-font-primary text-sm md:text-md">Important Notes & Disclaimers</p>
          </div>
          <button
            className="text-lg text-font-msg cursor-pointer"
            type="button"
            onClick={() => {
              setExpand((pre) => !pre);
            }}
          >
            {expand ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>
        {expand && (
          <ul className="list-disc pl-6 mt-1">
            {disclaimerTestList.map((text, i) => (
              <li key={i} className="text-sm text-font-primary font-light">
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default NoteAndDisclaimers;
