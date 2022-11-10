/* eslint-disable*/
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const rawDataPath = path.join(process.cwd(), '/src/raw-data');

const fetchLiveModules = async () => {
  const { data } = await axios.get('https://eddb.io/archive/v6/modules.json');
  console.log('Fetched modules from EDDB');
  fs.writeFileSync(`${rawDataPath}/modules.json`, JSON.stringify(data));
  console.log(`Wrote ${rawDataPath}/modules.json`);
};

const fetchCachedModules = () => {
  const modulesRaw = fs.readFileSync(`${rawDataPath}/modules.json`);
  return JSON.parse(modulesRaw);
};

const fetchLivePopulatedSystems = async () => {
  const { data } = await axios.get('https://eddb.io/archive/v6/systems_populated.json');
  console.log('Fetched populated systems from EDDB');
  fs.writeFileSync(`${rawDataPath}/systems_populated.json`, JSON.stringify(data));
  console.log(`Wrote ${rawDataPath}/systems_populated.json`);
};

const fetchCachedPopulatedSystems = () => {
  const populatedSystemsRaw = fs.readFileSync(`${rawDataPath}/systems_populated.json`);
  return JSON.parse(populatedSystemsRaw); // array of objects
};

const fetchLiveStations = async () => {
  const { data } = await axios.get('https://eddb.io/archive/v6/stations.json');
  console.log('Fetched stations from EDDB');
  // const filteredData = data.filter((station) => !!station.has_outfitting);
  fs.writeFileSync(`${rawDataPath}/stations.json`, JSON.stringify(data));
  console.log(`Wrote ${rawDataPath}/stations.json`);
};

const fetchCachedStations = () => {
  const outfittingStations = fs.readFileSync(`${rawDataPath}/stations.json`);
  return JSON.parse(outfittingStations); // array of objects
};

module.exports = {
  fetchLiveModules,
  fetchLivePopulatedSystems,
  fetchLiveStations,
  fetchCachedModules,
  fetchCachedPopulatedSystems,
  fetchCachedStations,
};
/* eslint-enable */
