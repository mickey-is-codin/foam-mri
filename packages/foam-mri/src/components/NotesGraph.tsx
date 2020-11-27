import React from 'react';
import { NotesImport, Node, Edge } from '../util/types';
import { cyStyle } from '../styles/cytoscapeStyle';
import { toGraphElements } from '../util/toGraphElements';
import { useCytoscape } from '../util/hooks';

interface NotesGraphProps {
  notesData: NotesImport;
  searchQuery: string;
};

const NotesGraph = (props: NotesGraphProps): JSX.Element => {
  const graphElements: (Node | Edge)[] = toGraphElements(props);
  useCytoscape(graphElements);
  return <div style={cyStyle} id="cy"></div>;
};

export default NotesGraph;
