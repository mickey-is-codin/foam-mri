import * as fs from 'fs';
import { toSecond } from './fp';
import { map, toArray, tap } from 'rxjs/operators';
import { readFile$ } from './rxjsFs';
import { NoteNode } from './types';

const toLinks = (content: string) => {
  const linkRegEx = /\[\[(.*?)\]\]/g;
  return Array.from(content.matchAll(linkRegEx), toSecond);
};

const toNoteNodes = (path: fs.PathLike) => (contentBuffer: Buffer | string) : NoteNode => {
  const content = contentBuffer.toString()
  const links = toLinks(content);
  return {
    path,
    links,
    content,
  }
}

export const toNoteNodes$ = (path: fs.PathLike) => {
  return readFile$(path).pipe(map(toNoteNodes(path)));
};