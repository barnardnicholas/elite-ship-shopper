import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config/firebaseConfig';
import { child, get, getDatabase, ref } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export const fetchModules = async () => {
  try {
    const snapshot = await get(child(dbRef, 'modules'));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      return [];
    }
  } catch (e) {
    throw new Error(e as any);
  }
};

export const fetchPopulatedSystems = async () => {
  try {
    const snapshot = await get(child(dbRef, 'systems'));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const fetchOutfittingStations = async () => {
  try {
    const snapshot = await get(child(dbRef, 'stations'));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};
