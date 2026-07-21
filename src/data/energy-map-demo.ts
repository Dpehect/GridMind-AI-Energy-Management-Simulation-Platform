export type EnergyZone = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  intensity: number;
  status: "normal" | "warning" | "critical";
};

export type EnergyDevicePin = {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "meter" | "hvac" | "lighting" | "charger";
  status: "online" | "warning" | "offline";
};

export const energyZones: EnergyZone[] = [
  { id: "z1", name: "Open Office", x: 8, y: 10, width: 34, height: 35, intensity: 62, status: "normal" },
  { id: "z2", name: "Meeting Wing", x: 46, y: 10, width: 22, height: 35, intensity: 81, status: "warning" },
  { id: "z3", name: "Server Room", x: 72, y: 10, width: 20, height: 35, intensity: 96, status: "critical" },
  { id: "z4", name: "Reception", x: 8, y: 50, width: 26, height: 35, intensity: 39, status: "normal" },
  { id: "z5", name: "Breakout Area", x: 38, y: 50, width: 24, height: 35, intensity: 54, status: "normal" },
  { id: "z6", name: "Operations", x: 66, y: 50, width: 26, height: 35, intensity: 74, status: "warning" }
];

export const energyDevicePins: EnergyDevicePin[] = [
  { id: "d1", label: "Main meter", x: 13, y: 18, type: "meter", status: "online" },
  { id: "d2", label: "AHU-04", x: 57, y: 25, type: "hvac", status: "warning" },
  { id: "d3", label: "Rack PDU", x: 80, y: 24, type: "meter", status: "online" },
  { id: "d4", label: "Lighting circuit", x: 48, y: 69, type: "lighting", status: "online" },
  { id: "d5", label: "EV charger", x: 77, y: 72, type: "charger", status: "offline" }
];
