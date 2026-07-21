"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  detectHardwareProfile,
  performanceFeatures,
  type HardwareProfile
} from "@/lib/performance/hardware-profile";

const Context = createContext<{
  profile: HardwareProfile;
  features: ReturnType<typeof performanceFeatures>;
}>({
  profile: "balanced",
  features: performanceFeatures("balanced")
});

export function HardwareProfileProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] =
    useState<HardwareProfile>("balanced");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setProfile(
      detectHardwareProfile({
        hardwareConcurrency:
          navigator.hardwareConcurrency,
        deviceMemory: (
          navigator as Navigator & {
            deviceMemory?: number;
          }
        ).deviceMemory,
        reducedMotion
      })
    );
  }, []);

  const value = useMemo(
    () => ({
      profile,
      features: performanceFeatures(profile)
    }),
    [profile]
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export function useHardwareProfile() {
  return useContext(Context);
}
