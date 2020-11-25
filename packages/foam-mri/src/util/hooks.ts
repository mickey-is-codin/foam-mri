import { useEffect } from 'react';
import cytoscape from 'cytoscape';
import { toBaseGraphStyle } from '../styles/cytoscapeStyle';

const renderCytoscape = (elements: any) => {
  // console.log('elements: ', elements);
  const cytoscapeContainer = document.getElementById('cy');
  const cytoscapeLayout = {
    name: 'random',
  };
  cytoscape({
    container: cytoscapeContainer,
    elements,
    style: toBaseGraphStyle(),
    layout: cytoscapeLayout
  })
};

export const useCytoscape = (graphElements: any) => {
  useEffect(() => {
    renderCytoscape(graphElements);
  });
};