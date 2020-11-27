import React, { useCallback, useState } from 'react';
import './styles/App.css';
import notesData from './data/notesData.json';
import NotesGraph from './components/NotesGraph';
import SearchBar from './components/SearchBar';

const App = () => {

  const [ finalSearchQuery, setFinalSearchQuery ] = useState('');

  const handleQuerySubmit = useCallback((query) => {
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
