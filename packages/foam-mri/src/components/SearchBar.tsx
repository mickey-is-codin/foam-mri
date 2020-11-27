import React, { useState, useCallback } from 'react';
import { useKeyListener } from '../util/hooks';
import { searchBarBackgroundStyle, searchBarStyle } from '../styles/searchBarStyle';
import { SPACEBAR_CODE, ESCAPE_CODE, ENTER_CODE } from '../util/constants'; // do this as a map

interface SearchBarProps {
  handleQuerySubmit: any;
};

const SearchBar = (props: SearchBarProps) => {

  const { handleQuerySubmit } = props;
  
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ searchDisplayed, setSearchDisplayed ] = useState(false);

  const handleChange = ({ target: { value } }: any) => setSearchQuery(value);

  const onKeyPress = useCallback((event) => {
    if(event.keyCode === SPACEBAR_CODE) {
      setSearchDisplayed(true);
    }
    if(setSearchDisplayed && (event.keyCode === ESCAPE_CODE)) {
      setSearchQuery('');
      setSearchDisplayed(false);
    }
    if(setSearchDisplayed && (event.keyCode === ENTER_CODE)) {
      handleQuerySubmit(searchQuery);
    }
  }, [setSearchDisplayed, setSearchQuery, handleQuerySubmit, searchQuery]);

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