import React, { useCallback, useState } from 'react';
import './styles/App.css';
import notesData from './data/notesData.json';
import NotesGraph from './components/NotesGraph';
import SearchBar from './components/SearchBar';

const App = (): JSX.Element => {

  // Next feature: Conditional sidebar on node select
  // Big refactor around exporting note contents as array of strings
  // Also refactor export to not use full path names
  // Necessary to use filePath key and value?
  // Would remove a lot of Object.entries() headache
  // Maybe make a graphUtil file for non-fp utils?

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
