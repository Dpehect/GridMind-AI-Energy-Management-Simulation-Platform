"use client";
import { create } from "zustand";
import { defaultDashboard } from "./data";
import type { DashboardWidget } from "./types";

type State = {
  widgets: DashboardWidget[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (id: string) => void;
  moveWidget: (id: string, x: number, y: number) => void;
  resizeWidget: (id: string, w: number, h: number) => void;
};

export const useDashboardBuilder = create<State>((set) => ({
  widgets: defaultDashboard.widgets,
  selectedId: null,
  setSelectedId: selectedId => set({ selectedId }),
  addWidget: widget => set(state => ({ widgets:[...state.widgets,widget] })),
  removeWidget: id => set(state => ({ widgets:state.widgets.filter(w=>w.id!==id), selectedId:null })),
  moveWidget: (id,x,y) => set(state => ({ widgets:state.widgets.map(w=>w.id===id?{...w,x,y}:w) })),
  resizeWidget: (id,w,h) => set(state => ({ widgets:state.widgets.map(item=>item.id===id?{...item,w,h}:item) }))
}));
