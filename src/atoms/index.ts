import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Coords, Itinerary, System } from '../types/internal';

export const selectedModulesAtom = atomWithStorage<number[]>('selectedModules', []);
export const searchTermAtom = atomWithStorage<string>('searchTerm', '');
export const selectedShipAtom = atomWithStorage<string | null>('selectedShip', null);
export const rangeAtom = atomWithStorage<number>('range', 20);
export const startCoordsAtom = atomWithStorage<Coords>('startCoods', { x: 0, y: 0, z: 0 });
export const itineraryAtom = atom<Itinerary | null>(null);
export const selectedSystemAtom = atomWithStorage<System | null>('selectedSystem', null);
