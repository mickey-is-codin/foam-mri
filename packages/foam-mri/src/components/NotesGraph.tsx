import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import cyStyle from '../styles/cyStyle';
import { toCytoscapeStyle } from '../styles/cytoscapeStyle';
import { toGraphElements } from '../util/toGraphElements';

const renderCytoscape = (elements: any) => {
  console.log('elements: ', elements);
  const cytoscapeContainer = document.getElementById('cy');
  const cytoscapeLayout = {
    name: 'random',
  };
  cytoscape({
    container: cytoscapeContainer,
    elements,
    style: toCytoscapeStyle(),
    layout: cytoscapeLayout
  })
};

const NotesGraph = (props: any) => {

  const { notesData } = props;
  const graphElements = toGraphElements(notesData);
  // const graphStyle = toGraphStyle(graphElements); // Style size of graph based on size?

  useEffect(() => {
    renderCytoscape(graphElements);
  });

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
