// ========= RAW DATA ==========
export interface System {
  name: string;
  id: number;
  x: number;
  y: number;
  z: number;
}

export interface Station {
  id: number;
  system_id: number;
  name: string;
  type: string;
  type_id: number;
  selling_modules: number[];
  selling_ships: string[];
  distance_to_star: number;
}

export interface Module {
  name: string;
  class: number;
  rating: string;
  id: number;
  ed_id: number;
}

// ========= ITINERARY DATA ==========

export interface IStation extends Station {
  modules_to_buy: Module[];
  ships_to_buy: string[];
}
export interface ISystem extends System {
  distance: number;
  stations: Record<number, IStation>;
}

export interface FISystem extends ISystem {
  stations: IStation[];
}

export type Itinerary = Record<number, ISystem>;

export type FItinerary = FISystem[];

export interface Coords {
  x: number;
  y: number;
  z: number;
}

export type SearchResponseData = Record<string, System>;
