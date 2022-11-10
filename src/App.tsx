import React, { ChangeEvent, Suspense } from 'react';
import './_styles/App.scss';
import Button from './components/form/Button';
import Select from './components/form/Select';
import { EDDBModule } from './types/eddb';
import { getNameFromModule } from './utils';
import useSearch from './hooks/useSearch';
import { FISystem, IStation, ISystem, Module } from './types/internal';
import { rangeAtom, searchTermAtom, selectedShipAtom } from './atoms';
import { useAtom } from 'jotai';
import Divider from './components/Divider';
import TextInput from './components/form/TextInput';

function App() {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [selectedShip, setSelectedShip] = useAtom(selectedShipAtom);
  const [range, setRange] = useAtom(rangeAtom);
  const {
    itinerary,
    search,
    modules,
    modulesToShow,
    selectedModules,
    setSelectedModules,
    shipOptions,
    // systemOptions,
    // selectedSystemID,
    handleSetSelectedSystem,
  } = useSearch();

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
          <h3>Results</h3>
          <div style={{ padding: '1rem 0' }}>
            <ol>
              {itinerary.map((system: FISystem, i: number) => (
                <li key={`${system.id}-${i}`} style={{ marginBottom: '1rem' }}>
                  <h4>{system.name}</h4>
                  <ul>
                    {system.stations.map((station: IStation, j: number) => (
                      <li key={`${station.id}-${j}`}>
                        <strong>{station.name}</strong>
                        {station.ships_to_buy.map((ship: string) => (
                          <div key={ship}>- {ship}</div>
                        ))}
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
      <div className="search-form-container">
        <div className="input-container">
          <h3>Selected Ship:</h3>
          <div style={{ display: 'inline-box', maxWidth: '15rem' }}>
            <Select
              name="selectedShip"
              value={selectedShip}
              onChange={(_: string, value: number | string | null) =>
                setSelectedShip(value as string)
              }
              options={shipOptions}
              placeholder={'None'}
            />
          </div>
        </div>
        <div className="input-container">
          <h3>Selected Star System:</h3>
          <div style={{ display: 'inline-box', maxWidth: '15rem' }}>
            <Select
              name="selectedSystem"
              value={0}
              onChange={handleSetSelectedSystem}
              options={[]}
              search
              placeholder="Sol"
              disabled
            />
          </div>
        </div>
        <div className="input-container">
          <h3>Range (Ly)</h3>
          <div style={{ display: 'inline-box', maxWidth: '15rem' }}>
            <TextInput
              name="selectedShip"
              value={`${range}`}
              onChange={(_: string, value: string) => setRange(+value)}
              placeholder={'None'}
              type="number"
            />
          </div>
        </div>
      </div>
      <div style={{ padding: '1rem 0' }}>
        <h3>Selected Modules:</h3>
        {selectedModules.map((moduleID: number) => {
          const thisModule = modules.find((module: Module) => module.id === moduleID);
          return (
            <Button inline key={moduleID} onClick={() => handleClickModule(moduleID)}>
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
        <h3>Search Modules:</h3>
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
            <Button inline key={`${module.id}-${i}`} onClick={() => handleClickModule(module.id)}>
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
