import Fuse from 'fuse.js';
import { NotesImport, Note } from './types';

export const toSearch = (query: string) => (notesData: NotesImport): Fuse.FuseResult<Note>[] => {
  const searchFields: Note[] = Object.values(notesData);
  const options: Fuse.IFuseOptions<Note> = {
    keys: ['content']
  };
  const fuse: Fuse<Note> = new Fuse(searchFields, options);
  const results: Fuse.FuseResult<Note>[] = fuse.search(query);
  return results;
};