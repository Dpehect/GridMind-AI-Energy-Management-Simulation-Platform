export type PerformanceMode = "quality" | "balanced" | "economy";
export type CameraPreset = "overview" | "front" | "top" | "floor";

export type TwinZone = {
  id: string;
  label: string;
  floor: number;
  position: [number, number, number];
  size: [number, number, number];
  intensity: number;
  alert?: boolean;
};

export type TwinFloor = {
  id: string;
  label: string;
  level: number;
  zones: TwinZone[];
};
