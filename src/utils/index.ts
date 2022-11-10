import { EDDBModule } from '../types/eddb';
import { Coords, IStation, ISystem, System } from '../types/internal';

export const getNameFromModule = (module: EDDBModule): string =>
  `${module?.class}${module?.rating} ${module?.group?.name}`;

export const covertArrToObj = (arr: any[]): Record<number | string, any> => {
  return arr.reduce((acc: any[], curr: any) => {
    return { ...acc, [curr.id]: curr };
  }, {});
};

export const getDistance = (from: Coords, to: Coords): number => {
  const { x: sX, y: sY, z: sZ } = from;
  const { x: eX, y: eY, z: eZ } = to;
  const dX = eX - sX;
  const dY = eY - sY;
  const dZ = eZ - sZ;
  return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2) + Math.pow(dZ, 2));
};

export const findSystemsInRange = (systems: System[], startCoords: Coords, range: number) => {
  const result = systems.reduce((acc: ISystem[], curr: System) => {
    const { x, y, z } = curr;
    const distance = getDistance(startCoords, { x, y, z } as Coords);
    if (distance <= range) return [...acc, { ...curr, distance, stations: [] as IStation[] }];
    return acc;
  }, [] as ISystem[]);

  return result.sort((a: ISystem, b: ISystem) => a.distance - b.distance) as ISystem[];
};
