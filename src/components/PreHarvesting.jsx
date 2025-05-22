import React from "react";
import { apiCalResConst } from "../utils/constant";
import { format } from "../helper/helper";
import { useDataContext } from "../context/useDataContext";

const PreHarvesting = () => {
  const { harvestingApiStatus, capitalGains } = useDataContext();

  const cardClassName =
    "col-span-12 md:col-span-6 bg-primary rounded-lg pl-4 py-[12px] pr-[40px] ";

  switch (harvestingApiStatus) {
    case apiCalResConst.inital:
    case apiCalResConst.loading:
      return <div className={cardClassName}>loading</div>;

    case apiCalResConst.success:
      return (
        <div className={cardClassName}>
          <h1 className="text-font-primary font-semibold">Pre Harvesting</h1>
          <div className="grid grid-cols-3 mt-2 text-[14px] gap-4 md:text-[16px]">
            <p className=" text-right text-font-msg col-start-2">Short-term</p>
            <p className=" text-right text-font-msg">Long-term</p>
            <p className="text-white">Profits</p>
            <p className="text-font-msg  text-right">
              {format(capitalGains.stcg.losses)}
            </p>
            <p className="text-font-msg text-right">
              {format(capitalGains.ltcg.losses)}
            </p>
            <p className="text-white">Losses</p>
            <p className="text-font-msg  text-right">
              {format(capitalGains.stcg.profits)}
            </p>
            <p className="text-font-msg  text-right">
              {format(capitalGains.ltcg.profits)}
            </p>
            <p className="text-white font-[600]">Net Capital Gains </p>
            <p className="text-font-primary font-[600]  text-right">
              {format(capitalGains.stcg.profits - capitalGains.stcg.losses)}
            </p>
            <p className="text-font-primary font-[600]  text-right">
              {format(capitalGains.ltcg.profits - capitalGains.ltcg.losses)}
            </p>
          </div>
          <div className="flex font-[600] text-font-primary gap-3 items-center py-1 mt-2">
            <h1 className="text-[16px] md:text-[20px]">Realised Capital Gains:</h1>
            <p className=" text-[18px] md:text-[28px]">
              {format(
                capitalGains.stcg.profits -
                  capitalGains.stcg.losses +
                  (capitalGains.ltcg.profits - capitalGains.ltcg.losses)
              )}
            </p>
          </div>
        </div>
      );

    case apiCalResConst.fail:
      return (
        <div className={cardClassName}>fail on fetching harvesting api</div>
      );
  }
};

export default PreHarvesting;
