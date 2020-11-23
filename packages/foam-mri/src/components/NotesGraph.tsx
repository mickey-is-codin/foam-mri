import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import cyStyle from '../styles/cyStyle';
import { toCytoscapeStyle } from '../styles/cytoscapeStyle';
import { toGraphElements } from '../util/toGraphElements';

const renderCytoscape = (elements: cytoscape.ElementsDefinition | cytoscape.ElementDefinition[]) => {
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

  useEffect(() => {
    renderCytoscape(graphElements);
  });

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
