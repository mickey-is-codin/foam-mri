import { NotesImport } from '../util/types';
import { toNodes } from './toNodes';
import { toEdges } from './toEdges';
import { toSearch } from './toSearch';

// Someday add checks to this or export for non-working links
// Actually might make more sense to add that to the export?

interface GraphElementsArgs {
  notesData: NotesImport;
  searchQuery: string;
};

export const toGraphElements = (args: GraphElementsArgs) : any => {
  
  const { notesData, searchQuery } = args;

  const searchHits = toSearch(searchQuery)(notesData);
  console.log('query: ', searchQuery, ' hits: ', searchHits);

  const nodes = toNodes(notesData, searchHits);
  const edges = toEdges(notesData, searchHits, nodes);
  return [...nodes, ...edges];
};