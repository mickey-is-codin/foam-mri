import React, { useState } from 'react';
import { useKeyListener } from '../util/hooks';
import { searchBarBackgroundStyle, searchBarStyle } from '../styles/searchBarStyle';
import { KEYCODES, SPACEBAR, ESCAPE, ENTER } from '../util/constants'; // do this as a map

interface SearchBarProps {
  handleQuerySubmit: any;
};

const SearchBar = (props: SearchBarProps) => {

  const { handleQuerySubmit } = props;
  
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ searchDisplayed, setSearchDisplayed ] = useState(false);

  const handleChange = ({ target: { value } }: any) => setSearchQuery(value);

  const spacePred = (event: any): boolean => !searchDisplayed && (event.keyCode === KEYCODES[SPACEBAR]);
  const escapePred = (event: any): boolean => searchDisplayed && (event.keyCode === KEYCODES[ESCAPE]);
  const enterPred = (event: any): boolean => searchDisplayed && (event.keyCode === KEYCODES[ENTER]);

  const spaceAction = (): void => {
    setSearchDisplayed(true);
  };
  const escapeAction = (): void => {
    setSearchQuery('');
    setSearchDisplayed(false);
  };
  const enterAction = (): void => {
    setSearchQuery('');
    setSearchDisplayed(false);
    handleQuerySubmit(searchQuery);
  };

  const predActionList = [
    [spacePred, spaceAction],
    [escapePred, escapeAction],
    [enterPred, enterAction],
  ];

  useKeyListener(predActionList);

  return searchDisplayed ? (
    <>
      <div style={searchBarBackgroundStyle}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search Notes"
          style={searchBarStyle}
        ></input>
      </div>
    </>
  ) : null;
};

export default SearchBar;