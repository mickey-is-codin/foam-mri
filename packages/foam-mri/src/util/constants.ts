import Fuse from 'fuse.js';
import { KeyCodesMap, Note, Node } from './types';

export const QUERY = 'synui';

export const BASE_NODE_COLOR: string = '#8b8b8b';
export const BASE_EDGE_COLOR: string = '#5d5d5d';
// export const BASE_EDGE_COLOR: string = '#ffffff';
export const HEATMAP_RESOLUTION: number = 20;
export const MAX_EDGE_WIDTH: number = 5;

export const SPACEBAR: string = 'SPACEBAR';
export const ESCAPE: string = 'ESCAPE';
export const ENTER: string = 'ENTER';

export const SPACEBAR_CODE: number = 32;
export const ESCAPE_CODE: number = 27;
export const ENTER_CODE: number = 13;

export const KEYCODES: KeyCodesMap = {
  [SPACEBAR]: SPACEBAR_CODE,
  ESCAPE: ESCAPE_CODE,
  ENTER: ENTER_CODE,
};

export const DEFAULT_NOTE: Note = {
  path: '',
  links: [],
  content: '',
};

export const DEFAULT_NOTE_SEARCH_HIT: Fuse.FuseResult<Note> = {
  item: DEFAULT_NOTE,
  refIndex: 0,
  matches: []
};

export const DEFAULT_NODE: Node = {
  data: {
    id: '',
    searchHits: []
  }
};