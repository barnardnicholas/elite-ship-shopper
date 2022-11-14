import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  isFetchingPopulatedSystemsAtom,
  populatedSystemsAtom,
  populatedSystemsErrorAtom,
} from '../services/firebase/firebaseAtoms';
import { fetchPopulatedSystems } from '../services/firebase/database';

const usePopulatedSystems = () => {
  const [populatedSystems, setPopulatedSystems] = useAtom(populatedSystemsAtom);
  const [isFetchingPopulatedSystems, setIsFetchingPopulatedSystems] = useAtom(
    isFetchingPopulatedSystemsAtom,
  );
  const [populatedSystemsError, setPopulatedSystemsError] = useAtom(populatedSystemsErrorAtom);

  const fetchPopulatedSystemsFromDB = async () => {
    console.log('fetchPopulatedSystemsFromDB');
    setIsFetchingPopulatedSystems(true);
    try {
      const populatedSystems = await fetchPopulatedSystems();
      setPopulatedSystems(populatedSystems);
      setIsFetchingPopulatedSystems(false);
    } catch (e) {
      setIsFetchingPopulatedSystems(false);
      setPopulatedSystemsError('Error fetching populatedSystems');
    }
  };

  useEffect(() => {
    fetchPopulatedSystemsFromDB();
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return {
    populatedSystems,
    isFetchingPopulatedSystems,
    populatedSystemsError,
  };
};

export default usePopulatedSystems;
