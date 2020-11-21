import * as fs from 'fs';

export interface NoteNode {
  path: fs.PathLike | string;
  links: fs.PathLike[] | string[];
  content: string;
};