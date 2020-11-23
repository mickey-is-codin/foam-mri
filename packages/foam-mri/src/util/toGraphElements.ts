import { identity } from "./fp";

/*
elements: [ // list of graph elements to start with
  { // node a
    data: { id: 'a' }
  },
  { // node b
    data: { id: 'b' }
  },
  { // edge ab
    data: { id: 'ab', source: 'a', target: 'b' }
  }
],
*/

export const toGraphElements = (notesData: any) => {
  const entries = Object.entries(notesData);
  // const elements = entries.reduce((elements, [notePath, note]) => {
  const elements = entries.reduce((elements, curr) => {
    console.log('curr: ', curr);
    return elements;
  }, []);
  return elements;
};