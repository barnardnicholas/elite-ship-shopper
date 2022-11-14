import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  isFetchingOutfittingStationsAtom,
  outfittingStationsAtom,
  outfittingStationsErrorAtom,
} from '../services/firebase/firebaseAtoms';
import { fetchOutfittingStations } from '../services/firebase/database';

const useOutfittingStations = () => {
  const [outfittingStations, setOutfittingStations] = useAtom(outfittingStationsAtom);
  const [isFetchingOutfittingStations, setIsFetchingOutfittingStations] = useAtom(
    isFetchingOutfittingStationsAtom,
  );
  const [outfittingStationsError, setOutfittingStationsError] = useAtom(
    outfittingStationsErrorAtom,
  );

  const fetchOutfittingStationsFromDB = async () => {
    console.log('fetchOutfittingStationsFromDB');
    setIsFetchingOutfittingStations(true);
    try {
      const outfittingStations = await fetchOutfittingStations();
      setOutfittingStations(outfittingStations);
      setIsFetchingOutfittingStations(false);
    } catch (e) {
      setIsFetchingOutfittingStations(false);
      setOutfittingStationsError('Error fetching outfittingStations');
    }
  };

  useEffect(() => {
    fetchOutfittingStationsFromDB();
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return {
    outfittingStations,
    isFetchingOutfittingStations,
    outfittingStationsError,
  };
};

export default useOutfittingStations;
