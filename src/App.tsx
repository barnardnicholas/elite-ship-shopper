import React, { ChangeEvent, Suspense } from 'react';
import './_styles/App.scss';
import Button from './components/form/Button';
import { EDDBModule } from './types/eddb';
import { getNameFromModule } from './utils';
import useSearch from './hooks/useSearch';
import { FISystem, IStation, ISystem, Module } from './types/internal';
import { searchTermAtom } from './atoms';
import { useAtom } from 'jotai';
import Divider from './components/Divider';

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
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const { itinerary, search, modules, modulesToShow, selectedModules, setSelectedModules } =
    useSearch();

  const handleClickModule = (id: number) => {
    if (selectedModules.includes(id))
      setSelectedModules(selectedModules.filter(moduleID => moduleID !== id));
    else setSelectedModules([...selectedModules, id]);
  };

  return (
    <div className="App">
      <h1>SHIP SHOPPER</h1>
      <Divider />
      {!!itinerary && (
        <>
          <div style={{ padding: '1rem 0' }}>
            <ol>
              {itinerary.map((system: FISystem, i: number) => (
                <li key={`${system.id}=${i}`}>
                  <h4>{system.name}</h4>
                  <ul>
                    {system.stations.map((station: IStation) => (
                      <li key={`${station.id}=${i}`}>
                        <strong>{station.name}</strong>
                        {station.modules_to_buy.map((module: Module) => {
                          return <div key={module.id}>- {module.name}</div>;
                        })}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <Divider />
        </>
      )}
      <div style={{ padding: '1rem 0' }}>
        <h3>Selected Modules:</h3>
        {selectedModules.map((moduleID: number) => {
          const thisModule = modules.find((module: Module) => module.id === moduleID);
          return (
            <Button key={moduleID} onClick={() => handleClickModule(moduleID)}>
              {thisModule?.name}
            </Button>
          );
        })}
        <div>
          <Button onClick={search}>Search</Button>
        </div>
      </div>
      <Divider />
      <div style={{ padding: '1rem 0' }}>
        <h3>Choose Modules:</h3>
        <input
          type="text"
          className="form-input text-input"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ padding: '1rem 0' }}>
        <ul>
          {modulesToShow.map((module: Module, i: number) => (
            <Button key={`${module.id}-${i}`} onClick={() => handleClickModule(module.id)}>
              {module.name}
            </Button>
          ))}
        </ul>
      </div>
      <Divider />
    </div>
  );
}

const AppContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
};

export default AppContainer;
