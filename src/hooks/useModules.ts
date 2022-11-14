import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  isFetchingModulesAtom,
  modulesAtom,
  modulesErrorAtom,
} from '../services/firebase/firebaseAtoms';
import { fetchModules } from '../services/firebase/database';

const useModules = () => {
  const [modules, setModules] = useAtom(modulesAtom);
  const [isFetchingModules, setIsFetchingModules] = useAtom(isFetchingModulesAtom);
  const [modulesError, setModulesError] = useAtom(modulesErrorAtom);

  const fetchModulesFromDB = async () => {
    console.log('fetchModulesFromDB');
    setIsFetchingModules(true);
    try {
      const modules = await fetchModules();
      setModules(modules);
      setIsFetchingModules(false);
    } catch (e) {
      setIsFetchingModules(false);
      setModulesError('Error fetching modules');
    }
  };

  useEffect(() => {
    fetchModulesFromDB();
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return {
    modules,
    isFetchingModules,
    modulesError,
  };
};

export default useModules;
