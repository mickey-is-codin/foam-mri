import Fuse from 'fuse.js';

export interface Color {
  [key: string]: number;
  r: number;
  g: number;
  b: number;
};

export interface KeyCodesMap {
  [key: string]: number;
};

export interface Note {
  path: string;
  links: string[];
  content: string;
};

export interface NotesImport {
  [key: string]: Note
};

export interface Node {
  data: {
    id: string,
    searchHits: readonly Fuse.FuseResultMatch[]
  }
};

export interface Edge {
  data: {
    id: string;
    source: string;
    target: string;
    sourceNode: Node;
    targetNode: Node;
  }
};

export type PredFunc = (x: any) => boolean;
export type ActionFunc = () => void;

export type PredAction = [PredFunc, ActionFunc]
export type PredActionList = PredAction[];