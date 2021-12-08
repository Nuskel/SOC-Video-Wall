export type PowerState = "on" | "off" | "pending";

export interface Monitor {

  ip: string;
  name: string;
  power: PowerState;
  source: string;
  desktop: string;
  videowall: boolean;
  selected?: boolean;

}
