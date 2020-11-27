import React from 'react';
import { NotesImport } from '../util/types';
import { cyStyle } from '../styles/cytoscapeStyle';
import { toGraphElements } from '../util/toGraphElements';
import { useCytoscape } from '../util/hooks';

interface NotesGraphProps {
  notesData: NotesImport;
  searchQuery: string;
};

const NotesGraph = (props: NotesGraphProps) => {

  const graphElements = toGraphElements(props);

  useCytoscape(graphElements);

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
