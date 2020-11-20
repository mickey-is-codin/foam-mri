import * as fs from 'fs';
import { promisify } from 'util';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);

// Hard-code for now but eventually get from command-line args
const FOAM_DIR = '';

console.log('starting');