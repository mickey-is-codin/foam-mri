import * as fs from 'fs';
import { promisify } from 'util';
import { from, EMPTY, of, Observable } from 'rxjs';
import { 
  filter,
  map,
  mergeMap, 
  tap, 
  toArray,
  zip
} from 'rxjs/operators';
import { stringify } from 'querystring';

// Hard-code for now but eventually get from command-line args
// Constants
const FOAM_DIR = '/Users/mickey/Documents/personal/foam-notebook';

// ==Functional Programming Helpers==
const noop = () => {};
const identity = (x: any): any => x;
const stringIdentity = (x: string | string[]) : string | string[] => x;
const statsIdentity = (x: Observable<fs.Stats>) : Observable<fs.Stats> => x;

// ==FS Helpers==
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);
const stat = promisify(fs.stat);

// const notDotFile = (file: fs.PathLike) => !file.toString().startsWith('.');
const notDotFile = (file: any) => !file.toString().startsWith('.');

console.log('Exporting your foam notebook...');

const filesInDir$ = (path: fs.PathLike) => from(readDir(path));
const statFile$ = (path: fs.PathLike) => from(stat(path));

// Whole thing should be one big RxJS composition
const toAllFiles$ = (prefix: string, dir: string) : any => {
  return filesInDir$(`${prefix}/${dir}`).pipe(
    mergeMap(stringIdentity),
    filter(notDotFile),
    mergeMap((file: fs.PathLike) => statFile$(`${prefix}/${dir}/${file}`).pipe(
      map(sf => ({file, isDir: sf.isDirectory()}))
    )),
    mergeMap(({ file, isDir }) => {
      return isDir ? toAllFiles$(prefix, `${dir}/${file}`) : of(`${dir}/${file}`);
    })
  );
};

const final$ = toAllFiles$(FOAM_DIR, '');

final$.subscribe((x: any) => console.log(`${FOAM_DIR}${x}`));