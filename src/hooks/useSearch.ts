import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import {
  itineraryAtom,
  rangeAtom,
  searchTermAtom,
  selectedModulesAtom,
  selectedShipAtom,
  selectedSystemAtom,
  startCoordsAtom,
} from '../atoms';
import modules from '../data/modules.json';
import outfittingStations from '../data/stations_with_outfitting.json';
import populatedSystems from '../data/systems_populated.json';
import {
  Coords,
  FISystem,
  FItinerary,
  IStation,
  ISystem,
  Itinerary,
  Module,
  Station,
  System,
} from '../types/internal';
import { DropdownOption } from '../types/DropdownOption';
import { findSystemsInRange } from '../utils';

import { ships } from '../constants/constants';

export interface SearchBody {
  selectedModules: number[];
  range: number;
  startCoords: Coords;
  selectedShip: null | string;
}

const useSearch = () => {
  const [systemSearchTerm, setSystemSearchTerm] = useState<string>('');
  const [selectedModules, setSelectedModules] = useAtom(selectedModulesAtom);
  const [searchTerm] = useAtom(searchTermAtom);
  const [selectedShip, setSelectedShip] = useAtom(selectedShipAtom);
  const [range, setRange] = useAtom(rangeAtom);
  const [selectedSystem, setSelectedSystem] = useAtom(selectedSystemAtom);
  const [itinerary, setItinerary] = useAtom(itineraryAtom);

  const startCoords: Coords = !!selectedSystem
    ? { x: selectedSystem.x, y: selectedSystem.y, z: selectedSystem.z }
    : { x: 0, y: 0, z: 0 };
  const selectedSystemID: number | null = !!selectedSystem ? selectedSystem.id : null;

  const modulesToShow = useMemo(() => {
    const filteredModules = modules.reduce((acc: Module[], curr: Module) => {
      if (!!acc.find((module: Module) => module.name === curr.name)) return acc;
      else return [...acc, curr];
    }, [] as Module[]);

    const filteredModulesToShow = filteredModules.filter((module: Module) => {
      if (selectedModules.includes(module.id)) return false;
      return `${module.class}${module.rating} ${module.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    return filteredModulesToShow;
  }, [selectedModules, searchTerm]);

  const search = () => {
    // Find systems in range
    // Sort by distance to ref star
    const systemsInRange = findSystemsInRange(populatedSystems, startCoords, range);

    // Loop through and find stations
    const systemsWithStations = systemsInRange.map((system: ISystem) => {
      const stationsToAdd: Station[] = (outfittingStations as Station[]).filter(
        (station: Station) => {
          return station.system_id === system.id;
        },
      );
      return {
        ...system,
        stations: stationsToAdd.map(
          (station: Station) => ({ ...station, modules_to_buy: [], ships_to_buy: [] } as IStation),
        ),
      };
    });

    // Loop through shopping list & find ship & modules

    const shoppingListRef: number[] = [...selectedModules];
    const itinerary: Itinerary = {};
    let addedShip = false;

    while (shoppingListRef.length) {
      try {
        const thisModuleID = shoppingListRef.shift() as number;
        const thisModule = modules.find((module: Module) => module.id === thisModuleID);
        let addedThisItem = false;

        systemsWithStations.forEach((system: ISystem) => {
          Object.values(system.stations).forEach(station => {
            // Find ship if necessary
            if (!!selectedShip && !addedShip && station.selling_ships.includes(selectedShip)) {
              // Add to itinerary
              if (!itinerary.hasOwnProperty(system.id)) {
                // System isn't in itinerary yet
                addedShip = true;
                itinerary[system.id] = {
                  ...system,
                  stations: [{ ...station, ships_to_buy: [selectedShip] }],
                };
              } else if (!itinerary[system.id].stations[station.id]) {
                // System is in itinerary but station isn't
                addedShip = true;
                itinerary[system.id].stations[station.id] = {
                  ...station,
                  ships_to_buy: [selectedShip],
                };
              } else {
                // System and station are present
                addedShip = true;
                const thisIStation = itinerary[system.id].stations[station.id];
                if (
                  !!thisIStation &&
                  !thisIStation.modules_to_buy.find((module: Module) => module.id === thisModuleID)
                )
                  thisIStation.ships_to_buy.push(selectedShip);
              }
            }

            // Find module
            if (station.selling_modules.includes(thisModuleID) && !addedThisItem && !!thisModule) {
              // Add to itinerary
              if (!itinerary.hasOwnProperty(system.id)) {
                // System isn't in itinerary yet
                addedThisItem = true;
                itinerary[system.id] = {
                  ...system,
                  stations: [{ ...station, modules_to_buy: [thisModule] }],
                };
              } else if (!itinerary[system.id].stations[station.id]) {
                // System is in itinerary but station isn't
                addedThisItem = true;
                itinerary[system.id].stations[station.id] = {
                  ...station,
                  modules_to_buy: [thisModule],
                };
              } else {
                // System and station are present
                addedThisItem = true;
                const thisIStation = itinerary[system.id].stations[station.id];
                if (
                  !!thisIStation &&
                  !thisIStation.modules_to_buy.find((module: Module) => module.id === thisModuleID)
                )
                  thisIStation.modules_to_buy.push(thisModule);
              }
            }
          });
        });
      } catch (e) {
        console.log('in catch in while');
        console.error(e);
      }
    }
    console.log(`Compiled ${Object.keys(itinerary).length} systems`);
    setItinerary(itinerary);
  };

  const formattedItinerary: FItinerary | null = useMemo(() => {
    if (!itinerary) return null;
    return Object.values(itinerary)
      .map((system: ISystem) => ({
        ...system,
        stations: Object.values(system.stations),
      }))
      .sort((a: FISystem, b: FISystem) => a.distance - b.distance);
  }, [itinerary]);

  const shipOptions: DropdownOption<string>[] = ships.map((ship: string) => ({
    label: ship,
    value: ship,
  }));

  const getSystemOptions = () => {
    if (systemSearchTerm.length < 3) return [{ label: 'Enter 2 charcters or more', value: 0 }];
    const result = populatedSystems
      .filter((system: System) =>
        system.name.toLowerCase().trim().includes(systemSearchTerm.toLowerCase().trim()),
      )
      .map((system: System) => ({ label: system.name, value: system.id }));
    console.log(result);
    return result;
  };

  const handleSetSelectedSystem = (name: string, value: string | number | null) => {
    const thisSystem = populatedSystems.find((system: System) => system.id === value);
    if (thisSystem) setSelectedSystem(thisSystem);
  };

  return {
    itinerary: formattedItinerary,
    search,
    modules: modules as Module[],
    modulesToShow: modulesToShow as Module[],
    selectedModules,
    setSelectedModules,
    shipOptions,
    systemOptions: getSystemOptions(),
    selectedSystemID,
    handleSetSelectedSystem,
  };
};

export default useSearch;
