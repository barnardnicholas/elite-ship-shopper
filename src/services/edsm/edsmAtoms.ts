import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { EDSMSystem, EDSMSystemFromSphere } from '../../types/edsm';
import { Module } from '../../types/internal';

export const systemsForOptionsAtom = atom<EDSMSystem[]>([]);
export const isFetchingSystemsForOptionsAtom = atom<boolean>(false);
export const systemsForOptionsErrorAtom = atom<string | null>(null);

export const sphereSystemsAtom = atom<EDSMSystemFromSphere[]>([]);
export const isFetchingSphereSystemsAtom = atom<boolean>(false);
export const sphereSystemsErrorAtom = atom<string | null>(null);
