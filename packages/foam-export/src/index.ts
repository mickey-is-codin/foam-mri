import { of } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { toListAllFiles$ } from './util/toListAllFiles';
import { toNoteNodes$ } from './util/toNoteNodes';
import { toNoteNodesObject } from './util/toNoteNodesObject';
import { toJson$ } from './util/toJson';

// Hard-code for now but eventually get from command-line args
// Constants
const FOAM_DIR = '/Users/mickey/Documents/personal/foam-notebook';
const EXPORT_DIR = '/Users/mickey/Documents/programming/projects/foam-mri/packages/foam-mri/src/data';
const EXPORT_PATH = `${EXPORT_DIR}/notesData.json`

const final$ = of(FOAM_DIR).pipe(
  mergeMap(prefix => toListAllFiles$(prefix, '')),
  map(path => `${FOAM_DIR}${path}`),
  mergeMap(toNoteNodes$),
  toArray(),
  map(toNoteNodesObject),
  mergeMap(toJson$(EXPORT_PATH))
);

console.log('Exporting your foam notebook...');
final$.subscribe(() => console.log(`Notes saved to ${EXPORT_PATH}`));