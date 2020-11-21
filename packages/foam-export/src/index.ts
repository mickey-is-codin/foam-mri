import { of } from 'rxjs';
import { map, mergeMap, } from 'rxjs/operators';
import { toListAllFiles$ } from './toListAllFiles';
import { toNoteNodes$ } from './toNoteNodes';

// Hard-code for now but eventually get from command-line args
// Constants
const FOAM_DIR = '/Users/mickey/Documents/personal/foam-notebook';

const final$ = of(FOAM_DIR).pipe(
  mergeMap(prefix => toListAllFiles$(prefix, '')),
  map(path => `${FOAM_DIR}${path}`),
  mergeMap(path => toNoteNodes$(path)),
);

console.log('Exporting your foam notebook...');
final$.subscribe(console.log);