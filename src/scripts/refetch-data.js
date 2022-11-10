/* eslint-disable */
const { fetchLiveModules, fetchLivePopulatedSystems, fetchLiveStations } = require('./fetches');

const downloadData = async () => {
  try {
    await fetchLiveModules();
    await fetchLivePopulatedSystems();
    await fetchLiveStations();
  } catch (e) {
    console.error(e);
  }
  console.log('FINISHED');
}; // Download fersh data from EDDB

downloadData(); // Download fresh data from EDDB
/* eslint-enable */
