import { useEffect, useCallback } from 'react';
import cytoscape from 'cytoscape';
import { PredFunc, ActionFunc, PredActionList, Node, Edge, PredAction } from './types';
import { toTrue, noop, second } from '../util/fp';
import { toBaseGraphStyle } from '../styles/cytoscapeStyle';

export const useCytoscape = (elements: (Node | Edge)[]): void => {
  useEffect(() => {
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

    const cy = cytoscape({
      container: cytoscapeContainer,
      elements,
      style: toBaseGraphStyle(),
      layout: cytoscapeLayout
    });

    cy.on('mouseover', 'node', (event) => {
      const node = event.target;
      node.addClass('hover');
    });
    cy.on('mouseout', 'node', (event) => {
      const node = event.target;
      node.removeClass('hover');
    });
    // selected
  });
};

export const useKeyListener = (predActionList: PredActionList): void => {
  const onKeyPress = useCallback((event: KeyboardEvent) => {
    const predAction: PredAction = predActionList.find(([pred]: [PredFunc, ActionFunc]) => pred(event)) || [toTrue, noop];
    second(predAction)();
  }, [predActionList]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [onKeyPress]);
};