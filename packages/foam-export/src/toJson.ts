import * as fs from 'fs';
import { map } from 'rxjs/operators';
import { writeFile$ } from './rxjsFs';
import { NoteNode } from './types';

export const toJson$ = (path: fs.PathLike) => (content: NoteNode[]) => {
  return writeFile$(path, JSON.stringify(content, null, 2)).pipe(
    map(() => content)
  );
};