import Fuse from 'fuse.js';
import { NotesImport, Note, Node, Edge } from '../util/types';
import { toNodes } from './toNodes';
import { toEdges } from './toEdges';
import { toSearch } from './toSearch';

interface GraphElementsArgs {
  notesData: NotesImport;
  searchQuery: string;
};

export const toGraphElements = (
  args: GraphElementsArgs
): (Node | Edge)[] => {
  
  const { notesData, searchQuery } = args;

  const searchHits: Fuse.FuseResult<Note>[] = toSearch(searchQuery)(notesData);

  const nodes: Node[] = toNodes(notesData, searchHits);
  const edges: Edge[] = toEdges(notesData, nodes);

  return [...nodes, ...edges];
};