import * as fs from 'fs';
import { map } from 'rxjs/operators';
import { writeFile$ } from './rxjsFs';

export const toJson$ = (path: fs.PathLike) => (content: any) => {
  return writeFile$(path, JSON.stringify(content, null, 2)).pipe(
    map(() => content)
  );
};