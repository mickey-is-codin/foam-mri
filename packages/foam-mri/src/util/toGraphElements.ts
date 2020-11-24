import { toNodes } from './toNodes';
import { toEdges } from './toEdges';

// Someday add checks to this or export for non-working links

export const toGraphElements = (notesData: any) : any => {
  const entries = Object.entries(notesData);
  const nodes = toNodes(entries);
  const edges = toEdges(entries);
  return [...nodes, ...edges];
};