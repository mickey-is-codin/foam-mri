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
    searchHits: string[]
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