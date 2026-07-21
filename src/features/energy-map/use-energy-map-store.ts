"use client";

import { create } from "zustand";

type LayerState = {
  heatmap: boolean;
  devices: boolean;
  alerts: boolean;
  labels: boolean;
};

type EnergyMapState = {
  floor: string;
  zoom: number;
  selectedZoneId: string | null;
  layers: LayerState;
  history: string[];
  setFloor: (floor: string) => void;
  setZoom: (zoom: number) => void;
  selectZone: (zoneId: string | null) => void;
  toggleLayer: (layer: keyof LayerState) => void;
  pushHistory: (entry: string) => void;
  undo: () => void;
};

export const useEnergyMapStore = create<EnergyMapState>((set) => ({
  floor: "Floor 3",
  zoom: 1,
  selectedZoneId: null,
  layers: { heatmap: true, devices: true, alerts: true, labels: true },
  history: [],
  setFloor: (floor) => set({ floor, selectedZoneId: null }),
  setZoom: (zoom) => set({ zoom: Math.min(1.8, Math.max(0.7, zoom)) }),
  selectZone: (selectedZoneId) => set({ selectedZoneId }),
  toggleLayer: (layer) => set((state) => ({ layers: { ...state.layers, [layer]: !state.layers[layer] } })),
  pushHistory: (entry) => set((state) => ({ history: [...state.history.slice(-19), entry] })),
  undo: () => set((state) => ({ history: state.history.slice(0, -1) }))
}));
