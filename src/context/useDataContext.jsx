import React, { createContext, useContext, useState } from "react";
import { apiCalResConst } from "../utils/constant";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [harvestingApiStatus, setHarvestingApiStatus] = useState(
    apiCalResConst.inital
  );
  const [capitalGains, setCapitalGains] = useState({});
  const [afterHarvesting, setAfterHarvesting] = useState({});
  const [holdingApiStatus, setHoldingApiStatus] = useState(
    apiCalResConst.inital
  );
  const [holdings, setHoldings] = useState([]);
  const [stcgSort, setStcgSort] = useState({ show: false, isDec: false });
  const [ltcgSort, setLtcgSort] = useState({ show: false, isDec: false });
  const [holdSelectAll, setHoldSelectAll] = useState(false);

  const fetchHarvesting = async () => {
    setHarvestingApiStatus(apiCalResConst.loading);
    try {
      const res = await fetch(
        "https://portfolio-server-pink-seven.vercel.app/api/konix/capital-gains"
      );
      const data = await res.json();
      setCapitalGains(data.capitalGains);
      setAfterHarvesting(data.capitalGains);
      setHarvestingApiStatus(apiCalResConst.success);
    } catch (error) {
      console.log(error);
      setHarvestingApiStatus(apiCalResConst.fail);
    }
  };

  const fetchHolding = async () => {
    setHoldingApiStatus(apiCalResConst.loading);
    try {
      const res = await fetch(
        "https://portfolio-server-pink-seven.vercel.app/api/konix/holdings"
      );
      let data = await res.json();
      data = data.map((hold) => ({ ...hold, isSelected: false }));
      setHoldings(data);
      setHoldingApiStatus(apiCalResConst.success);
    } catch (error) {
      console.log(error);
      setHoldingApiStatus(apiCalResConst.fail);
    }
  };

  const onSelectHold = (index) => {
    const updatedHoldings = [...holdings];
    const newCapitalGains = afterHarvesting;

    updatedHoldings[index].isSelected = !updatedHoldings[index].isSelected;

    updatedHoldings.forEach((hold) => {
      if (hold.isSelected) {
        const { ltcg, stcg } = hold;

        if (ltcg.gain > 0) newCapitalGains.ltcg.profits += ltcg.gain;
        else newCapitalGains.ltcg.losses += ltcg.gain;

        if (stcg.gain > 0) newCapitalGains.stcg.profits += stcg.gain;
        else newCapitalGains.stcg.losses += stcg.gain;
      }
    });
    if (holdings.every((hold) => hold.isSelected)) {
      setHoldSelectAll(true);
    } else {
      setHoldSelectAll(false);
    }
    setHoldings(updatedHoldings);
    setAfterHarvesting(newCapitalGains);
  };

  const onSortStcg = () => {
    let newHoldings;

    if (stcgSort.isDec) {
      newHoldings = holdings.sort((a, b) => a.stcg.gain - b.stcg.gain);
    } else {
      newHoldings = holdings.sort((a, b) => b.stcg.gain - a.stcg.gain);
    }

    setStcgSort((pre) => ({ ...pre, show: true, isDec: !pre.isDec }));
    setHoldings(newHoldings);
  };

  const onSortLtcg = () => {
    let newHoldings;

    if (ltcgSort.isDec) {
      newHoldings = holdings.sort((a, b) => a.ltcg.gain - b.ltcg.gain);
    } else {
      newHoldings = holdings.sort((a, b) => b.ltcg.gain - a.ltcg.gain);
    }

    setLtcgSort((pre) => ({ ...pre, show: true, isDec: !pre.isDec }));
    setHoldings(newHoldings);
  };

  const onSelectAllHold = () => {
    if (!holdSelectAll) {
      setHoldings((pre) => pre.map((hold) => ({ ...hold, isSelected: true })));
    } else {
      setHoldings((pre) => pre.map((hold) => ({ ...hold, isSelected: false })));
    }

    setHoldSelectAll((pre) => !pre);
  };

  return (
    <DataContext.Provider
      value={{
        harvestingApiStatus,
        capitalGains,
        afterHarvesting,
        holdingApiStatus,
        holdings,
        stcgSort,
        ltcgSort,
        holdSelectAll,
        fetchHarvesting,
        fetchHolding,
        onSelectHold,
        onSortStcg,
        onSortLtcg,
        onSelectAllHold,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
