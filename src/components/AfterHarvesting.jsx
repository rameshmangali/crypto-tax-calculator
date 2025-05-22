import React from "react";
import { apiCalResConst } from "../utils/constant";
import { format } from "../helper/helper";
import { useDataContext } from "../context/useDataContext";

const AfterHarvesting = () => {
  const { harvestingApiStatus, afterHarvesting } = useDataContext();

  const cardClass =
    "col-span-12 md:col-span-6 bg-gradient-to-b from-[#3C9AFF] to-[#0066FE] rounded-lg pl-4 py-[12px] pr-[40px]";

  switch (harvestingApiStatus) {
    case apiCalResConst.inital:
    case apiCalResConst.loading:
      return <div className={cardClass}>loading</div>;

    case apiCalResConst.success:
      return (
        <div className={cardClass}>
          <h1 className="text-font-primary font-semibold">Pre Harvesting</h1>
          <div className="grid grid-cols-3 mt-2 text-[14px] md:text-[16px] gap-4">
            <p className=" text-right text-font-msg col-start-2">
              Short-term
            </p>
            <p className=" text-right text-font-msg">Long-term</p>
            <p className="text-white">Profits</p>
            <p className="text-font-msg  text-right">
              {format(afterHarvesting.stcg.losses)}
            </p>
            <p className="text-font-msg  text-right">
              {format(afterHarvesting.ltcg.losses)}
            </p>
            <p className="text-white">Losses</p>
            <p className="text-font-msg  text-right">
              {format(afterHarvesting.stcg.profits)}
            </p>
            <p className="text-font-msg  text-right">
              {format(afterHarvesting.ltcg.profits)}
            </p>
            <p className="text-white font-[600]">Net Capital Gains </p>
            <p className="text-font-primary font-[600]  text-right">
              {format(
                afterHarvesting.stcg.profits - afterHarvesting.stcg.losses
              )}
            </p>
            <p className="text-font-primary font-[600]  text-right">
              {format(
                afterHarvesting.ltcg.profits - afterHarvesting.ltcg.losses
              )}
            </p>
          </div>
          <div className="flex font-[600] text-font-primary gap-3 items-center py-1 mt-2">
            <h1 className="text-[16px] md:text-[20px]">Realised Capital Gains:</h1>
            <p className="text-[18px] md:text-[28px]">
              {format(
                afterHarvesting.stcg.profits -
                  afterHarvesting.stcg.losses +
                  (afterHarvesting.ltcg.profits - afterHarvesting.ltcg.losses)
              )}
            </p>
          </div>
        </div>
      );

    case apiCalResConst.fail:
      return <div className={cardClass}>fail on fetching harvesting api</div>;
  }
};

export default AfterHarvesting;
