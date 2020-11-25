import React from 'react';
import cyStyle from '../styles/cyStyle';
import { toGraphElements } from '../util/toGraphElements';
import { useCytoscape } from '../util/hooks';

const NotesGraph = (props: any) => {

  const { notesData } = props;
  const graphElements = toGraphElements(notesData);
  // const graphStyle = toGraphStyle(graphElements); // Style size of graph based on size?

  useCytoscape(graphElements);

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
