import * as fs from 'fs';
import { toSecond } from './fp';
import { map, toArray } from 'rxjs/operators';
import { readFile$ } from './rxjsFs';

interface NoteNode {
  path: fs.PathLike | string;
  links: fs.PathLike[] | string[];
  content: string;
};

const toLinks = (content: string) => {
  const linkRegEx = /\[\[(.*?)\]\]/g;
  return Array.from(content.matchAll(linkRegEx), toSecond);
};

export const toNoteNodes$ = (path: fs.PathLike) => {
  return readFile$(path).pipe(
    map((contentBuffer) => {
      const content = contentBuffer.toString()
      const links = toLinks(content);
      return {
        path,
        links,
        content,
      }
    }),
    toArray(),
  );
};