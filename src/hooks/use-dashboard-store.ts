import { create } from "zustand";

type DashboardState = {
  range: "24h" | "7d" | "30d";
  setRange: (range: DashboardState["range"]) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  range: "24h",
  setRange: (range) => set({ range })
}));
