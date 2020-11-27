import { NotesImport } from '../util/types';
import { toNodes } from './toNodes';
import { toEdges } from './toEdges';
import { toSearch } from './toSearch';
import { QUERY } from './constants';

// Someday add checks to this or export for non-working links
// Actually might make more sense to add that to the export?

export const toGraphElements = (notesData: NotesImport) : any => {
  const searchHits = toSearch(QUERY)(notesData);
  console.log('searchHits: ', searchHits);
  const nodes = toNodes(notesData);
  const edges = toEdges(notesData, nodes);
  return [...nodes, ...edges];
};