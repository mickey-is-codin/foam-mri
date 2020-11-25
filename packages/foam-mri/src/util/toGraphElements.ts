import { toNodes } from './toNodes';
import { toEdges } from './toEdges';
import { toSearch } from './toSearch';

// Someday add checks to this or export for non-working links

const QUERY = 'synui';

export const toGraphElements = (notesData: any) : any => {
  const entries = Object.entries(notesData);
  const searchHits = toSearch(QUERY)(notesData);
  console.log('searchHits: ', searchHits);
  const nodes = toNodes(entries);
  const edges = toEdges(entries, nodes);
  return [...nodes, ...edges];
};