import * as fs from 'fs';
import { of } from 'rxjs';
import { 
  filter,
  map,
  mergeMap, 
} from 'rxjs/operators';
import { stringIdentity } from './fp';
import { readDir$, statFile$ } from './rxjsFs';

// ==Local Helpers==
const notDotFile = (file: fs.PathLike) => !file.toString().startsWith('.');

export const toListAllFiles$ = (prefix: string, dir: string) : any => {
  return readDir$(`${prefix}/${dir}`).pipe(
    mergeMap(stringIdentity),
    filter(notDotFile),
    mergeMap((file: fs.PathLike) => statFile$(`${prefix}/${dir}/${file}`).pipe(
      map(fileStat => ({file, isDir: fileStat.isDirectory()}))
    )),
    mergeMap(({ file, isDir }) => {
      return isDir ? toListAllFiles$(prefix, `${dir}/${file}`) : of(`${dir}/${file}`);
    }),
  );
};