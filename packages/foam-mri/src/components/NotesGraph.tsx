import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import cyStyle from '../styles/cyStyle';
import { toCytoscapeStyle } from '../styles/cytoscapeStyle';

const renderCytoscape = () => {
  const cytoscapeContainer = document.getElementById('cy');
  const cytoscapeElements: any = [];
  const cytoscapeLayout = {
    name: 'grid',
    rows: 1
  };
  cytoscape({
    container: cytoscapeContainer,
    elements: cytoscapeElements,
    style: toCytoscapeStyle(),
    layout: cytoscapeLayout
  })
};

const NotesGraph = () => {
  useEffect(() => {
    renderCytoscape();
  });

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
