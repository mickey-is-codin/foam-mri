import { of } from 'rxjs';
import { map, mergeMap, } from 'rxjs/operators';
import { toListAllFiles$ } from './toListAllFiles';
import { toNoteNodes$ } from './toNoteNodes';
import { toJson$ } from './toJson';

// Hard-code for now but eventually get from command-line args
// Constants
const FOAM_DIR = '/Users/mickey/Documents/personal/foam-notebook';
const EXPORT_DIR = '/Users/mickey/Documents/programming/projects/foam-mri/packages/foam-export';

const final$ = of(FOAM_DIR).pipe(
  mergeMap(prefix => toListAllFiles$(prefix, '')),
  map(path => `${FOAM_DIR}${path}`),
  mergeMap(toNoteNodes$),
  mergeMap(toJson$(`${EXPORT_DIR}/export.json`))
);

console.log('Exporting your foam notebook...');
final$.subscribe(console.log);