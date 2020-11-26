import React, { useCallback } from 'react';
import { useSpaceListener } from '../util/hooks';

const SPACEBAR_CODE = 32;

const SearchBar = () => {
  const onSpacePress = useCallback((event) => {
    if(event.keyCode === SPACEBAR_CODE) {
      console.log('space pressed');
    }
  }, []);

  useSpaceListener(onSpacePress);

  return (
    <>
    </>
  );
};

export default SearchBar;