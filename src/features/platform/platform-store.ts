"use client";
import { create } from "zustand";

type PlatformState = {
  commandOpen: boolean;
  notificationOpen: boolean;
  mobileNavOpen: boolean;
  globalQuery: string;
  setCommandOpen: (value: boolean) => void;
  setNotificationOpen: (value: boolean) => void;
  setMobileNavOpen: (value: boolean) => void;
  setGlobalQuery: (value: string) => void;
};

export const usePlatformStore = create<PlatformState>((set) => ({
  commandOpen: false,
  notificationOpen: false,
  mobileNavOpen: false,
  globalQuery: "",
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setNotificationOpen: (notificationOpen) => set({ notificationOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setGlobalQuery: (globalQuery) => set({ globalQuery })
}));
