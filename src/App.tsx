import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import './_styles/App.scss';
import { modules } from './data/modules';
import Button from './components/form/Button';
import { EDDBModule } from './types/eddb';
import { System } from './types/internal';

const selectedModulesAtom = atom<number[]>([]);
const searchTermAtom = atom<string>('');

const sampleResult = {
  '17072': {
    name: 'Sol',
    distance: 0,
    stations: [
      {
        id: 19,
        name: 'Galileo',
        distance: 0,
        modules: [900, 1283, 1203, 1122],
      },
      {
        id: 21,
        name: 'Li Qing Jao',
        distance: 0,
        modules: [945, 1245, 1102, 1047],
      },
      {
        id: 122,
        name: 'M.Gorbachev',
        distance: 0,
        modules: [1012],
      },
      {
        id: 18,
        name: 'Abraham Lincoln',
        distance: 0,
        modules: [1529, 1193],
      },
      {
        id: 128,
        name: 'Daedalus',
        distance: 0,
        modules: [887],
      },
    ],
  },
};

function App() {
  const [selectedModules, setSelectedModules] = useAtom(selectedModulesAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  const handleClickModule = (id: number) => {
    if (selectedModules.includes(id))
      setSelectedModules(selectedModules.filter(moduleID => moduleID !== id));
    else setSelectedModules([...selectedModules, id]);
  };

  const modulesToShow = useMemo(() => {
    return modules.filter((module: EDDBModule) => {
      if (selectedModules.includes(module.id)) return false;
      return `${module.class}${module.rating} ${module.group.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [selectedModules, searchTerm]);

  return (
    <div className="App">
      <h1>SHIP SHOPPER</h1>
      <div style={{ padding: '1rem 0' }}>
        <h3>Selected Modules:</h3>
        {selectedModules.map((moduleID: number) => {
          const thisModule = modules.find((module: EDDBModule) => module.id === moduleID);
          const name = `${thisModule?.class}${thisModule?.rating} ${thisModule?.group?.name}`;
          return (
            <Button key={moduleID} onClick={() => handleClickModule(moduleID)}>
              {name}
            </Button>
          );
        })}
      </div>
      <div style={{ padding: '1rem 0' }}>{selectedModules.toString()}</div>
      <div style={{ padding: '1rem 0' }}>
        <h3>Choose Modules:</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ padding: '1rem 0' }}>
        <ul>
          {modulesToShow.map((module: EDDBModule) => (
            <Button key={module.id} onClick={() => handleClickModule(module.id)}>
              {`${module.class}${module.rating} ${module.group.name}`}
            </Button>
          ))}
        </ul>
      </div>
      <div style={{ padding: '1rem 0' }}>
        <ol>
          {Object.values(sampleResult).map((system: any) => (
            <li key={system.id}>
              <h4>{system.name}</h4>
              <ul>
                {system.stations.map((station: any) => (
                  <li key={station.id}>
                    <strong>{station.name}</strong>
                    {station.modules.map((moduleID: number) => {
                      const thisModule = modules.find(
                        (module: EDDBModule) => module.id === moduleID,
                      );
                      console.log(thisModule);
                      return (
                        <div key={moduleID}>
                          - {`${thisModule?.class}${thisModule?.rating} ${thisModule?.group?.name}`}
                        </div>
                      );
                    })}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
