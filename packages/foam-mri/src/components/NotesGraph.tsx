import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import cyStyle from '../styles/cyStyle';
import { toCytoscapeStyle } from '../styles/cytoscapeStyle';

const renderCytoscape = () => {
  const cytoscapeContainer = document.getElementById('cy');
  const cytoscapeElements: any = [];
  const cytoscapeLayout = {
    name: 'random',
  };
  cytoscape({
    container: cytoscapeContainer,
    elements: cytoscapeElements,
    style: toCytoscapeStyle(),
    layout: cytoscapeLayout
  })
};

const NotesGraph = (props: any) => {

  const { notesData } = props;
  console.log('notesData: ', notesData);

  useEffect(() => {
    renderCytoscape();
  });

  return (
    <div style={cyStyle} id="cy"></div>
  );
};

export default NotesGraph;
