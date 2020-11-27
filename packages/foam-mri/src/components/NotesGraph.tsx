import React from 'react';
import { NotesImport } from '../util/types';
import { cyStyle } from '../styles/cytoscapeStyle';
import { toGraphElements } from '../util/toGraphElements';
import { useCytoscape } from '../util/hooks';

interface NotesGraphProps {
  notesData: NotesImport;
};

const NotesGraph = (props: NotesGraphProps) => {

  const { notesData } = props;

  const graphElements = toGraphElements(notesData);

  useCytoscape(graphElements);

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
