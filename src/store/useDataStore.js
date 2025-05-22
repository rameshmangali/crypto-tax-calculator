import { create } from "zustand";
import { apiCalResConst } from "../utils/constant";
const useDataStore = create((set, get) => ({
  harvestingApiStatus: apiCalResConst.inital,
  capitalGains: {},
  afterHarvesting: {},
  fetchHarvesting: async () => {
    try {
      set({ harvestingApiStatus: apiCalResConst.loading });
      const res = await fetch(
        "https://portfolio-server-pink-seven.vercel.app/api/konix/capital-gains"
      );
      const data = await res.json();
      set({
        harvestingApiStatus: apiCalResConst.success,
        capitalGains: data.capitalGains,
        afterHarvesting: data.capitalGains,
      });
    } catch (error) {
      console.log(error);
      set({ harvestingApiStatus: apiCalResConst.fail });
    }
  },
  holdingApiStatus: apiCalResConst.inital,
  holdings: [],
  fetchHolding: async () => {
    try {
      set({ holdingApiStatus: apiCalResConst.loading });
      const res = await fetch(
        "https://portfolio-server-pink-seven.vercel.app/api/konix/holdings"
      );
      let data = await res.json();
      data = data.map((hold) => ({ ...hold, isSelected: false }));
      set({ holdings: data, holdingApiStatus: apiCalResConst.success });
    } catch (error) {
      set({ holdingApiStatus: apiCalResConst.fail });
    }
  },
  onSelectHold: (index) => {
    let holdings = [...get().holdings];
    var capitalGains = { ...get().capitalGains };
    holdings = holdings.map((hold, i) => {
      if (i === index) {
        return {
          ...hold,
          isSelected: !hold.isSelected,
        };
      }
      return hold;
    });

    holdings.forEach((data) => {
      if (data.isSelected) {
        if (data.ltcg.gain > 0) {
          capitalGains.ltcg.profits += data.ltcg.gain;
        } else {
          capitalGains.ltcg.losses += data.ltcg.gain;
        }
        if (data.stcg.gain > 0) {
          capitalGains.stcg.profits += data.stcg.gain;
        } else {
          capitalGains.stcg.losses += data.stcg.gain;
        }
      }
    });
    
    set({ holdings, afterHarvesting: capitalGains });
  },
}));

export default useDataStore;
