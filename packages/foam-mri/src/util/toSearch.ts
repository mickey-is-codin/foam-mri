import Fuse from 'fuse.js';
import { NotesImport, Note } from './types';

export const toSearch = (query: string) => (notesData: NotesImport): Fuse.FuseResult<Note>[] => {
  // const searchFields: Note[] = Object.values(notesData);
  const values = Object.values(notesData);
  const searchFields: any = values.reduce((acc, val: any): any => {
    return [...acc, {
      ...val,
      path: val.path,
      links: val.links,
      content: val.content.split('\n')
    }];
  }, []);
  console.log('searchFields: ', searchFields);
  const options: Fuse.IFuseOptions<Note> = {
    keys: ['content'],
    includeScore: true,
    includeMatches: true,
    // findAllMatches: true,
  };
  const fuse: Fuse<Note> = new Fuse(searchFields, options);
  const results: Fuse.FuseResult<Note>[] = fuse.search(query);
  console.log('search results: ', results);
  return results;
};