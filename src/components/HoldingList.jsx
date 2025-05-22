import React, { useEffect, useState } from "react";
import { apiCalResConst } from "../utils/constant";
import Amount from "./Amount";
import { useDataContext } from "../context/useDataContext";

const HoldingList = () => {
  const { holdings, holdingApiStatus, fetchHolding, onSelectHold } =
    useDataContext();

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchHolding();
  }, []);

  switch (holdingApiStatus) {
    case apiCalResConst.inital:
    case apiCalResConst.loading:
      return <p>loading</p>;

    case apiCalResConst.success:
      return (
        <>
          {holdings.slice(0, showAll ? holdings.length : 4).map((hold, i) => (
            <div
              key={i}
              className={`${
                hold.isSelected && "bg-[#121D3A]"
              } grid py-1 items-center grid-cols-13 border-b border-font-msg text-white text-[16px] font-normal`}
            >
              <input
                type="checkbox"
                onClick={() => onSelectHold(i, hold)}
                checked={hold.isSelected}
                className="h-[18px] w-[18px] mx-auto border border-gray-500 rounded-sm peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-all"
              />
              <div className="col-span-2 flex items-center gap-2">
                <img src={hold.logo} className="h-[28px]" />
                <div>
                  <p className="">{hold.coin}</p>
                  <p className="text-sm text-font-msg whitespace-pre-line">
                    {hold.coinName}
                  </p>
                </div>
              </div>
              <div className="text-right col-span-2">
                <div className="flex justify-end gap-1">
                  <Amount>{hold.totalHolding}</Amount>
                  <p>{hold.coin}</p>
                </div>
                <Amount className="text[14px] text-font-msg">
                  {hold.averageBuyPrice}
                </Amount>
              </div>
              <Amount className="col-span-2 text-right">
                {hold.currentPrice}
              </Amount>
              <div className="text-right col-span-2">
                <Amount>{hold.stcg.gain}</Amount>
                <Amount className="text[14px] text-font-msg">
                  {hold.stcg.balance}
                </Amount>
              </div>
              <div className="text-right col-span-2">
                <Amount>{hold.ltcg.gain}</Amount>
                <Amount className="text[14px] text-font-msg">
                  {hold.ltcg.balance}
                </Amount>
              </div>
            </div>
          ))}
          <button
            className="text-hightlight mt-3"
            onClick={() => setShowAll((pre) => !pre)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </>
      );
    case apiCalResConst.fail:
      return <p>error accor on fecting</p>;
    default:
      return <></>;
  }
};

export default HoldingList;
