// Similar to nodes, we want to conditionally style based on search hits
// If the source and target of an edge both contain >= 1 hit then style

import { NotesImport, Note, Edge } from './types';

export const toEdges = (notesData: NotesImport, nodes: any) => {
  
  const entries: [string, Note][] = Object.entries(notesData);

  return entries.reduce((edges: Edge[], [notePath, note]: [string, Note]) => {
    const { links } = note;
    const [fromId] = notePath.split('.');
    const newEdges = links.reduce((newEdges: Edge[], link: string) => {
      const newEdge = {
        data: {
          id: `${fromId}-${link}`,
          source: fromId,
          target: link,
          sourceNode: nodes.find(({data: { id }} : any) => id === fromId),
          targetNode: nodes.find(({data: { id }} : any) => id === link),
        }
      };
      return [...newEdges, newEdge];
    }, []);
    return [...edges, ...newEdges];
  }, []);
};