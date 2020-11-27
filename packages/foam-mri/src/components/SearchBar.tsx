import React, { useState, useCallback } from 'react';
import { useKeyListener } from '../util/hooks';
import { searchBarBackgroundStyle, searchBarStyle } from '../styles/searchBarStyle';
import { SPACEBAR_CODE, ESCAPE_CODE } from '../util/constants';

const SearchBar = () => {
  
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ searchDisplayed, setSearchDisplayed ] = useState(false);

  const handleChange = ({ target: { value } }: any) => setSearchQuery(value);

  const onKeyPress = useCallback((event) => {
    if(event.keyCode === SPACEBAR_CODE) {
      setSearchDisplayed(true);
    }
    if(event.keyCode === ESCAPE_CODE) {
      setSearchDisplayed(false);
    }
  }, [setSearchDisplayed]);

  useKeyListener(onKeyPress);

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