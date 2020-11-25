import Fuse from 'fuse.js';

export const toSearch = (query: string) => (notesData: any) => {
  const searchFields = Object.values(notesData);
  const fuse = new Fuse(searchFields, {
    keys: ['content']
  });
  return fuse.search(query);
};