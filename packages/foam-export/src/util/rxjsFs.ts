import { promisify } from 'util';
import * as fs from 'fs';
import { from } from 'rxjs';

// ==RxJS FS Helpers==
export const readDir = promisify(fs.readdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const copyFile = promisify(fs.copyFile);
export const appendFile = promisify(fs.appendFile);
export const statFile = promisify(fs.stat);

export const readDir$ = (path: fs.PathLike) => from(readDir(path));
export const statFile$ = (path: fs.PathLike) => from(statFile(path));
export const readFile$ = (path: fs.PathLike) => from(readFile(path));
export const writeFile$ = (path: fs.PathLike, data: string) => from(writeFile(path, data));
export const appendFile$ = (path: fs.PathLike, data: string) => from(appendFile(path, data));