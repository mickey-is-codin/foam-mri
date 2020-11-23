import { NoteNode } from './types';
import { last } from './fp';

export const toNoteNodesObject = (noteNodes: NoteNode[]) => {
  return noteNodes.reduce((noteNodesObject, noteNode) => {
    const fullPathString = noteNode.path.toString();
    const key = last(fullPathString.split('/'));
    return {
      ...noteNodesObject,
      [key]: noteNode
    };
  }, {});
};