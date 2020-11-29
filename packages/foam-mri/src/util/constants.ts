import { KeyCodesMap } from './types';

export const QUERY = 'synui';

export const BASE_NODE_COLOR = '#8b8b8b';
// export const BASE_EDGE_COLOR = '#5d5d5d';
export const BASE_EDGE_COLOR = '#ffffff';
export const HEATMAP_RESOLUTION = 20;

export const SPACEBAR = 'SPACEBAR';
export const ESCAPE = 'ESCAPE';
export const ENTER = 'ENTER';

export const SPACEBAR_CODE = 32;
export const ESCAPE_CODE = 27;
export const ENTER_CODE = 13;

export const KEYCODES: KeyCodesMap = {
  [SPACEBAR]: SPACEBAR_CODE,
  ESCAPE: ESCAPE_CODE,
  ENTER: ENTER_CODE,
};

export const DEFAULT_NOTE = {
  path: '',
  links: [],
  content: '',
};

export const DEFAULT_NOTE_SEARCH_HIT = {
  item: DEFAULT_NOTE,
  refIndex: 0,
  matches: []
};

export const DEFAULT_NODE = {
  data: {
    id: '',
    searchHits: []
  }
};