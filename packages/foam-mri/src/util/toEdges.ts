// Similar to nodes, we want to conditionally style based on search hits
// If the source and target of an edge both contain >= 1 hit then style

import { NotesImport, Note, Node, Edge } from './types';

export const toEdges = (notesData: NotesImport, nodes: Node[]) => {
  
  const entries: [string, Note][] = Object.entries(notesData);

  return entries.reduce((edges: Edge[], [notePath, note]: [string, Note]): Edge[] => {
    const { links } = note;
    const [fromId]: string[] = notePath.split('.');
    const sourceNode: Node | undefined = nodes.find(({data: { id }} : any) => id === fromId);
    const newEdges: Edge[] = links.reduce((newEdges: Edge[], link: string) => {
      const targetNode: Node | undefined = nodes.find(({data: { id }} : any) => id === link);
      if (!sourceNode || !targetNode) {
        throw new Error('No target or source found for node');
      }
      const newEdge: Edge = {
        data: {
          id: `${fromId}-${link}`,
          source: fromId,
          target: link,
          sourceNode,
          targetNode,
        }
      };
      return [...newEdges, newEdge];
    }, []);
    return [...edges, ...newEdges];
  }, []);
};