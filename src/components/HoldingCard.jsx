import React from "react";
import Container from "./Container";
import HoldingList from "./HoldingList";
import { useDataContext } from "../context/useDataContext";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const HoldingCard = () => {
  const {
    onSortStcg,
    stcgSort,
    ltcgSort,
    onSortLtcg,
    onSelectAllHold,
    holdSelectAll,
  } = useDataContext();
  return (
    <Container>
      <div className="bg-primary p-4 rounded-md overflow-y-scroll">
        <div className="min-w-6xl min-h-1/2">
        <h1 className="text-white p-3">Holdings</h1>
          <div className="grid grid-cols-13 bg-bgclr mb-1 py-1 rounded-md text-white text-[16px] items-center justify-center text-center">
            <input
              type="checkbox"
              onClick={onSelectAllHold}
              checked={holdSelectAll}
              className="h-[18px] w-[18px]border border-gray-500 rounded-sm peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-all"
            />

            <p className="col-span-2 text-left">Asset</p>
            <div className="col-span-2 text-right">
              <p>Holdings</p>
              <span className="text-font-msg text-sm">Current Market Rate</span>
            </div>
            <p className="col-span-2">Total Current Value</p>
            <button
              onClick={onSortStcg}
              className="col-span-2 flex items-center gap-2 justify-center"
              type="button"
            >
              {stcgSort.show &&
                (!stcgSort.isDec ? <MdExpandMore /> : <MdExpandLess />)}
              <p>Short-terms</p>
            </button>
            <button
              onClick={onSortLtcg}
              className="col-span-2 flex items-center gap-2 justify-center"
              type="button"
            >
              {ltcgSort.show &&
                (!ltcgSort.isDec ? <MdExpandMore /> : <MdExpandLess />)}
              <p>Long-Terms</p>
            </button>
            <p className="col-span-2">Amount to sell</p>
          </div>
          <HoldingList />
        </div>
      </div>
    </Container>
  );
};

export default HoldingCard;
