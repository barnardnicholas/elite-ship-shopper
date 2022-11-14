import { Coords } from './internal';

export interface BaseEDSMSystem {
  name: string;
  id: number;
  coords: Coords;
  id64: number;
  requirePermit: boolean;
}

export interface EDSMSystem {
  coordsLocked: boolean;
  permitName: string;
}

export interface EDSMSystemFromSphere extends BaseEDSMSystem {
  distance: number;
}
