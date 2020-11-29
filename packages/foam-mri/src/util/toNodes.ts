import Fuse from 'fuse.js';
import { toNodeId } from './fp';
import { NotesImport, Note, Node } from './types';
import { DEFAULT_NOTE_SEARCH_HIT } from './constants';

const toSearchMatches = (searchHits: Fuse.FuseResult<Note>[], currentNotePath: string): ReadonlyArray<Fuse.FuseResultMatch> => {
  const { matches = [] }: Fuse.FuseResult<Note> = searchHits.find(({ item: { path } }: Fuse.FuseResult<Note>) => {
    return path === currentNotePath;
  }) || DEFAULT_NOTE_SEARCH_HIT;
  return matches;
};

const toNewNode = (id: string, matches: ReadonlyArray<Fuse.FuseResultMatch>): Node => ({
  data: {
    id,
    searchHits: matches
  }
});

export const toNodes = (notesData: NotesImport, searchHits: Fuse.FuseResult<Note>[]): Node[] => {

  const entries: [string, Note][] = Object.entries(notesData);

  return entries.reduce((nodes: Node[], [notePath, { path: currentNotePath }]: [string, Note]) => {
    const matches: ReadonlyArray<Fuse.FuseResultMatch> = toSearchMatches(searchHits, currentNotePath);
    const id = toNodeId(notePath);
    return [...nodes, toNewNode(id, matches)];
  }, []);
};