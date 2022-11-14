import axios from 'axios';
import { EDSMSystem, EDSMSystemFromSphere } from '../../types/edsm';
import { Coords } from '../../types/internal';

const url = 'https://www.edsm.net/api-v1';

export const searchEDSMSystems = async (searchTerm = '') => {
  console.log(` Searching for ${searchTerm}`);
  const { data } = await axios.get<EDSMSystem[]>(
    `${url}/systems?systemName=${searchTerm}&showCoordinates=1&showId=1&showPermit=1`,
  );
  console.log(data);
  return data;
};

export const fetchEDSMSystemSphere = async (coords: Coords, radius: number) => {
  const { x, y, z } = coords;
  const { data } = await axios.get<EDSMSystemFromSphere[]>(
    `${url}/sphere-systems?x=${x}&y=${y}&z=${z}&radius=${radius}&showId=1&showPermit=1`,
  );
  console.log(data);
  return data;
};
