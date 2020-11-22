import React from 'react';
import './styles/App.css';
import notesData from './data/notesData.json';
import NotesGraph from './components/NotesGraph';

const App = () => {
  return (
    <NotesGraph 
      notesData={notesData}
    />
  );
};

export default App;
