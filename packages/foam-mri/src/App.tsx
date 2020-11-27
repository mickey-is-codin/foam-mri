import React from 'react';
import './styles/App.css';
import notesData from './data/notesData.json';
import NotesGraph from './components/NotesGraph';
import SearchBar from './components/SearchBar';

const App = () => {

  return (
    <>
      <NotesGraph notesData={notesData} />
      <SearchBar />
    </>
  );
};

export default App;
