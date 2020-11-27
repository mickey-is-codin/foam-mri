import { useEffect, useCallback } from 'react';
import { toTrue, noop, second } from '../util/fp';
import cytoscape from 'cytoscape';
import { toBaseGraphStyle } from '../styles/cytoscapeStyle';

const renderCytoscape = (elements: any) => {
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

export const useKeyListener = (predActionList: any) => {
  const onKeyPress = useCallback((event) => {
    const predAction = predActionList.find(([pred]: any) => pred(event)) || [toTrue, noop];
    second(predAction)();
  }, [predActionList]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [onKeyPress]);
};