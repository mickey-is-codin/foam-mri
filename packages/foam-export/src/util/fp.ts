import * as fs from 'fs';
import { Observable } from 'rxjs';

// ==Functional Programming Helpers==
export const noop = () => {};
export const identity = (x: any): any => x;
export const stringIdentity = (x: string | string[]) : string | string[] => x;
export const statsIdentity = (x: Observable<fs.Stats>) : Observable<fs.Stats> => x;
export const toSecond = ([,second]: any[]) => second;
export const last = (xs: any[]) : any => xs[xs.length - 1];