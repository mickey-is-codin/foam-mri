import Fuse from 'fuse.js';
import { NotesImport, Note } from './types';

const searchOptions: Fuse.IFuseOptions<Note> = {
  keys: ['content'],
  includeScore: true,
  includeMatches: true,
};

// If we refactor notes to export as string array we remove need for this
const toSearchableArray = (
  notesData: NotesImport
): Note[] => {
  const notes: Note[] = Object.values(notesData);
  const searchFields: Note[] = notes.reduce((
    searchArray: Note[], 
    note: Note
  ): Note[] => {
    const { content } = note;
    if (Array.isArray(content)) return [...searchArray, note];
    const newNote: Note = {
      ...note,
      content: content.split('\n')
    };
    return [...searchArray, newNote];
  }, []);
  return searchFields;
};

export const toSearch = (query: string) => {
  return (notesData: NotesImport): Fuse.FuseResult<Note>[] => {
    const searchFields: Note[] = toSearchableArray(notesData);
    const fuse: Fuse<Note> = new Fuse(searchFields, searchOptions);
    return fuse.search(query);
  };
};