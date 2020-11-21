import * as fs from 'fs';
import { identity } from './fp';
import { map } from 'rxjs/operators';
import { writeFile$ } from './rxjsFs';
import { NoteNode } from './types';

export const toJson$ = (path: fs.PathLike) => (content: NoteNode[]) => {
  return writeFile$(path, JSON.stringify(content)).pipe(
    map(() => content)
  );
};