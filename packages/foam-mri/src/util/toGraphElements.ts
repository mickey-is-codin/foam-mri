import { toNodes } from './toNodes';
import { toEdges } from './toEdges';

/*
elements: [ // list of graph elements to start with
  { // node a
    data: { id: 'a' }
  },
  { // node b
    data: { id: 'b' }
  },
  { // edge ab
    data: { id: 'ab', source: 'a', target: 'b' }
  }
],
*/

export const toGraphElements = (notesData: any) : any => {
  const entries = Object.entries(notesData);
  const nodes = toNodes(entries);
  const edges = toEdges(entries);
  return [...nodes, ...edges];
};