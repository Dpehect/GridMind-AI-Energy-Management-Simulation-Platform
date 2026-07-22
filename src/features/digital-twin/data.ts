import type { TwinFloor } from "./types";

export const twinFloors: TwinFloor[] = [
  {
    id: "floor-1",
    label: "Ground floor",
    level: 0,
    zones: [
      { id: "lobby", label: "Lobby", floor: 0, position: [-2.4, 0, 0], size: [3.8, 0.45, 3.2], intensity: 0.42 },
      { id: "operations", label: "Operations", floor: 0, position: [2.1, 0, 0], size: [4.2, 0.45, 3.2], intensity: 0.88, alert: true }
    ]
  },
  {
    id: "floor-2",
    label: "First floor",
    level: 1,
    zones: [
      { id: "offices", label: "Offices", floor: 1, position: [-2.2, 1.25, 0], size: [4, 0.45, 3.2], intensity: 0.57 },
      { id: "meeting", label: "Meeting rooms", floor: 1, position: [2.2, 1.25, 0], size: [4, 0.45, 3.2], intensity: 0.31 }
    ]
  },
  {
    id: "floor-3",
    label: "Second floor",
    level: 2,
    zones: [
      { id: "lab", label: "Energy lab", floor: 2, position: [-2.2, 2.5, 0], size: [4, 0.45, 3.2], intensity: 0.76 },
      { id: "server", label: "Server room", floor: 2, position: [2.2, 2.5, 0], size: [4, 0.45, 3.2], intensity: 0.96, alert: true }
    ]
  }
];
