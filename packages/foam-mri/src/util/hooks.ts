import { useEffect } from 'react';
import cytoscape from 'cytoscape';
import { toBaseGraphStyle } from '../styles/cytoscapeStyle';

const renderCytoscape = (elements: any) => {
  // console.log('elements: ', elements);
  const cytoscapeContainer = document.getElementById('cy');
  const cytoscapeLayout = {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
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

export const useSpaceListener = (onSpacePress: any) => {
  useEffect(() => {
    document.addEventListener("keydown", onSpacePress, false);

    return () => {
      document.removeEventListener("keydown", onSpacePress, false);
    };
  }, [onSpacePress]);
};