// Similar to nodes, we want to conditionally style based on search hits
// If the source and target of an edge both contain >= 1 hit then style

import { toNodeId } from './fp';
import { NotesImport, Note, Node, Edge } from './types';
import { DEFAULT_NODE } from './constants';

const toNodeFinder = (nodes: Node[]) => (currentId: string): Node => {
  return nodes.find(({data: { id }} : Node) => {
    return id === currentId;
  }) || DEFAULT_NODE;
};

const toNewEdge = (
  fromId: string, 
  toId: string, 
  sourceNode: Node, 
  targetNode: Node
): Edge => ({
  data: {
    id: `${fromId}-${toId}`,
    source: fromId,
    target: toId,
    sourceNode,
    targetNode,
  }
});

export const toEdges = (notesData: NotesImport, nodes: Node[]) => {
  
  const entries: [string, Note][] = Object.entries(notesData);

  const nodeFinder = toNodeFinder(nodes);

  const toEdgesFromLinks = (fromId: string, links: string[], sourceNode: Node) => {
    return links.reduce((newEdges: Edge[], toId: string) => {
      const targetNode: Node = nodeFinder(toId);
      return [...newEdges, toNewEdge(fromId, toId, sourceNode, targetNode)];
    }, []);
  };

  return entries.reduce((edges: Edge[], [notePath, { links }]: [string, Note]): Edge[] => {
    const fromId = toNodeId(notePath);
    const sourceNode: Node = nodeFinder(fromId);
    const newEdges = toEdgesFromLinks(fromId, links, sourceNode);
    return [...edges, ...newEdges];
  }, []);
};