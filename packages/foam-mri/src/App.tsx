import React, { useCallback, useState } from 'react';
import './styles/App.css';
import notesData from './data/notesData.json';
import NotesGraph from './components/NotesGraph';
import SearchBar from './components/SearchBar';

const App = (): JSX.Element => {

  const [ finalSearchQuery, setFinalSearchQuery ] = useState<string>('');

  const handleQuerySubmit = useCallback((query): void => {
    setFinalSearchQuery(query);
  }, []);

  return (
    <>
      <NotesGraph notesData={notesData} searchQuery={finalSearchQuery} />
      <SearchBar handleQuerySubmit={handleQuerySubmit} />
    </>
  );
};

export default App;
