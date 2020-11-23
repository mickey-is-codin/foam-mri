import { NoteNode } from './types';

export const toNoteNodesObject = (noteNodes: NoteNode[]) => {
  return noteNodes.reduce((noteNodesObject, noteNode) => {
    return {
      ...noteNodesObject,
      [noteNode.path.toString()]: noteNode
    };
  }, {});
};