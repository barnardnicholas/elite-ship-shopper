/* eslint-disable */
const fs = require('fs');
const path = require('path');
const {
  fetchCachedModules,
  fetchCachedPopulatedSystems,
  fetchCachedStations,
} = require('./fetches');
const processedDataPath = path.join(process.cwd(), 'src/data');

const getNameFromModule = module => `${module?.class}${module?.rating} ${module?.group?.name}`;

const processModules = () => {
  console.log('Fetching modules.json');
  const modules = fetchCachedModules();
  console.log('Fetched modules.json. Processing...');
  const processedModules = modules.map(module => {
    return {
      name: getNameFromModule(module),
      class: module.class,
      rating: module.rating,
      id: module.id,
      ed_id: module.ed_id,
    };
  });
  console.log('Processed modules. Saving...');
  fs.writeFileSync(`${processedDataPath}/modules.json`, JSON.stringify(processedModules));
  console.log('FINISHED');
}; // Process Modules

const processPopulatedSystems = () => {
  console.log('Fetching systems_populated.json');
  const systems = fetchCachedPopulatedSystems();
  console.log('Fetched systems_populated.json. Processing...');
  const processedSystems = systems.map(system => {
    return {
      name: system.name,
      id: system.id,
      x: system.x,
      y: system.y,
      z: system.z,
      ed_id: system.ed_id,
    };
  });
  console.log('Processed populated systems. Saving...');
  fs.writeFileSync(`${processedDataPath}/systems_populated.json`, JSON.stringify(processedSystems));
  console.log('FINISHED');
}; // Process Systems

const processStations = () => {
  console.log('Fetching stations.json');
  const stations = fetchCachedStations();
  console.log('Fetched stations.json. Filtering...');
  const filteredStations = stations.filter(station => {
    return station.has_outfitting;
  });
  const processedStations = filteredStations.map(station => {
    return {
      id: station.id,
      system_id: station.system_id,
      name: station.name,
      x: station.x,
      y: station.y,
      z: station.z,
      type: station.type,
      type_id: station.type_id,
      selling_modules: station.selling_modules,
      selling_ships: station.selling_ships,
      distance_to_star: station.distance_to_star,
    };
  });
  console.log('Processed stations. Saving...');
  fs.writeFileSync(
    `${processedDataPath}/stations_with_outfitting.json`,
    JSON.stringify(processedStations),
  );
  console.log('FINISHED');
}; // Process Stations

processModules();
processPopulatedSystems();
processStations();
/* eslint-enable */
