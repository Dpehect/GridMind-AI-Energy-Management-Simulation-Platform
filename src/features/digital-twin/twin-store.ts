"use client";

import { create } from "zustand";
import type { CameraPreset, PerformanceMode } from "./types";

type TwinState = {
  exploded: boolean;
  selectedFloor: number | null;
  selectedZone: string | null;
  performanceMode: PerformanceMode;
  cameraPreset: CameraPreset;
  setExploded: (value: boolean) => void;
  setSelectedFloor: (floor: number | null) => void;
  setSelectedZone: (zone: string | null) => void;
  setPerformanceMode: (mode: PerformanceMode) => void;
  setCameraPreset: (preset: CameraPreset) => void;
};

export const useTwinStore = create<TwinState>((set) => ({
  exploded: true,
  selectedFloor: null,
  selectedZone: null,
  performanceMode: "balanced",
  cameraPreset: "overview",
  setExploded: (exploded) => set({ exploded }),
  setSelectedFloor: (selectedFloor) => set({ selectedFloor }),
  setSelectedZone: (selectedZone) => set({ selectedZone }),
  setPerformanceMode: (performanceMode) => set({ performanceMode }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset })
}));
