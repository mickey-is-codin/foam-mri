import React, { useState } from 'react';
import { useKeyListener } from '../util/hooks';
import { searchBarBackgroundStyle, searchBarStyle } from '../styles/searchBarStyle';
import { KEYCODES, SPACEBAR, ESCAPE, ENTER } from '../util/constants';
import { ActionFunc, PredActionList } from '../util/types';

interface SearchBarProps {
  handleQuerySubmit: any;
};

const SearchBar = (props: SearchBarProps): JSX.Element | null => {

  const { handleQuerySubmit } = props;
  
  const [ searchQuery, setSearchQuery ] = useState<string>('');
  const [ searchDisplayed, setSearchDisplayed ] = useState<boolean>(false);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setSearchQuery(value);

  const spacePred = (event: KeyboardEvent): boolean => !searchDisplayed && (event.keyCode === KEYCODES[SPACEBAR]);
  const escapePred = (event: KeyboardEvent): boolean => searchDisplayed && (event.keyCode === KEYCODES[ESCAPE]);
  const enterPred = (event: KeyboardEvent): boolean => searchDisplayed && (event.keyCode === KEYCODES[ENTER]);

  const spaceAction: ActionFunc = () => {
    setSearchDisplayed(true);
  };
  const escapeAction: ActionFunc = () => {
    setSearchQuery('');
    setSearchDisplayed(false);
  };
  const enterAction: ActionFunc = () => {
    setSearchQuery('');
    setSearchDisplayed(false);
    handleQuerySubmit(searchQuery);
  };

  const predActionList: PredActionList = [
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