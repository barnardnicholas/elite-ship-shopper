import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Module, Station, System } from '../../types/internal';

export const modulesAtom = atomWithStorage<Module[]>('modules', []);
export const isFetchingModulesAtom = atom<boolean>(false);
export const modulesErrorAtom = atom<string | null>(null);

export const populatedSystemsAtom = atomWithStorage<System[]>('populatedSystems', []);
export const isFetchingPopulatedSystemsAtom = atom<boolean>(false);
export const populatedSystemsErrorAtom = atom<string | null>(null);

export const outfittingStationsAtom = atomWithStorage<Station[]>('populatedSystems', []);
export const isFetchingOutfittingStationsAtom = atom<boolean>(false);
export const outfittingStationsErrorAtom = atom<string | null>(null);
