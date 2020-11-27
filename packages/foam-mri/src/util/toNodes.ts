import Fuse from 'fuse.js';
import { NotesImport, Note, Node } from './types';

export const toNodes = (notesData: NotesImport, searchHits: Fuse.FuseResult<Note>[]): Node[] => {

  const entries: [string, Note][] = Object.entries(notesData);

  return entries.reduce((nodes: Node[], [notePath, { path: shortenedPath }]: [string, Note]) => {
    const hits = searchHits.filter(({ item: { path } }: any) => path === shortenedPath);
    const [id]: string[] = notePath.split('.');
    const newNode: Node = {
      data: {
        id,
        searchHits: hits
      }
    };
    return [...nodes, newNode];
  }, []);
};