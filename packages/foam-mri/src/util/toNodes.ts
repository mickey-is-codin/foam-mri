import { NotesImport, Note, Node } from './types';

export const toNodes = (notesData: NotesImport): Node[] => {

  const entries: [string, Note][] = Object.entries(notesData);

  return entries.reduce((nodes: Node[], [notePath]: [string, Note]) => {
    const [id]: string[] = notePath.split('.');
    const newNode: Node = {
      data: {
        id,
        searchHits: []
      }
    };
    return [...nodes, newNode];
  }, []);
};