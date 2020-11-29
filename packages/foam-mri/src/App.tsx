import React, { useCallback, useState } from 'react';
import './styles/App.css';
import notesDataImport from './data/notesData.json';
import NotesGraph from './components/NotesGraph';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import { Note, NotesImport } from './util/types';

const App = (): JSX.Element => {

  // Next feature: Conditional sidebar on node select
  // Big refactor around exporting note contents as array of strings
  // Also refactor export to not use full path names
  // Necessary to use filePath key and value?
  // Would remove a lot of Object.entries() headache
  // Maybe make a graphUtil file for non-fp utils?
  // Also need to clip max node size to heatmap range

  const [ finalSearchQuery, setFinalSearchQuery ] = useState<string>('');
  const [ sidebarNote, setSidebarNote ] = useState<Note | undefined>(undefined);
  const [ notesData ] = useState<NotesImport>(notesDataImport);

  const handleQuerySubmit = useCallback((query): void => {
    setFinalSearchQuery(query);
  }, []);

  const updateSidebarNote = useCallback((note): void => {
    if (!note) {
      setSidebarNote(undefined);
      return;
    }
    const noteKey = `${note.data('id')}.md`;
    setSidebarNote(notesData[noteKey]);
  }, [notesData]);

  return (
    <>
      <NotesGraph notesData={notesData} searchQuery={finalSearchQuery} updateSidebarNote={updateSidebarNote} />
      <SearchBar handleQuerySubmit={handleQuerySubmit} />
      <Sidebar sidebarNote={sidebarNote} updateSidebarNote={updateSidebarNote} />
    </>
  );
};

export default App;
