export type PowerState = 1 | 0 | "pending";

export interface Monitor {

  ip: string;
  name: string;
  power: PowerState;
  source: string;
  desktop: string;
  videowall: boolean;
  selected?: boolean;

}

export interface DeviceMonitor {

  power: string;
  source: string;
  videowall: string;

}

export const Sources = [
  {
    id: "hdmi1",
    name: "HDMI 1"
  },
  {
    id: "hdmi2",
    name: "HDMI 2"
  },
  {
    id: "display_port",
    name: "Display Port"
  }
];
