import cytoscape from 'cytoscape';
import { toHeatmapColors } from './colors';
import { clipTo, intMean, allButLast } from '../util/fp';
import { BASE_NODE_COLOR, BASE_EDGE_COLOR, HEATMAP_RESOLUTION } from '../util/constants';

// Uncomment for custom heat map
// import { Color } from '../util/types';
// const startColor: Color = {
//   r: 0,
//   g: 255,
//   b: 0,
// };
// const endColor: Color = {
//   r: 0,
//   g: 0,
//   b: 255,
// };

// TYPESSSSSS

const toHeatmapRange = clipTo(HEATMAP_RESOLUTION);
const heatmapColors = toHeatmapColors(HEATMAP_RESOLUTION);
const nodeColors = [BASE_NODE_COLOR, ...heatmapColors];
const edgeColors = [BASE_EDGE_COLOR, BASE_EDGE_COLOR, ...allButLast(heatmapColors)];

const toNodeBackgroundColor = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  // if (numSearchHits > 1) {
  //   console.log(`${node.data('id')}: ${numSearchHits}`);
  // }
  const clippedHits = toHeatmapRange(numSearchHits);
  return nodeColors[clippedHits];
};

const toNodeSize = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  return numSearchHits === 0 ? 8 : (numSearchHits + 1) * 8;
};

const toNodeLabel = (node: any) => {
  const id = node.data('id');
  const numSearchHits = node.data('searchHits').length;
  return numSearchHits === 0 ? '' : id;
};

const toEdgeColor = (edge: any) => {
  const numSourceSearchHits = edge._private.data.sourceNode.data.searchHits.length;
  const numTargetSearchHits = edge._private.data.targetNode.data.searchHits.length;
  if (!(numSourceSearchHits && numTargetSearchHits)) {
    return BASE_EDGE_COLOR;
  }
  const meanHits = intMean(numSourceSearchHits, numTargetSearchHits);
  const clippedHits = toHeatmapRange(meanHits);
  return edgeColors[clippedHits];
};

const nodeStyle: cytoscape.StylesheetStyle = {
  selector: 'node',
  style: {
    'background-color': toNodeBackgroundColor,
    // 'label': 'data(id)',
    'label': toNodeLabel,
    'width': toNodeSize,
    'height': toNodeSize,
  }
};

const nodeHoverStyle: cytoscape.StylesheetStyle = {
  selector: 'node.hover',
  style: {
    'background-color': toNodeBackgroundColor,
    'label': 'data(id)',
    'width': 50,
    'height': 50,
  }
};

const edgeStyle: cytoscape.StylesheetStyle = {
  selector: 'edge',
  style: {
    'width': 2,
    'line-color': toEdgeColor,
    'curve-style': 'bezier'
  }
};

const labelStyle: cytoscape.StylesheetStyle = {
  selector: 'label',
  style: {
    'color': '#ffffff',
  }
};

export const toBaseGraphStyle = (): cytoscape.StylesheetStyle[] => [ 
  nodeStyle,
  nodeHoverStyle,
  edgeStyle, 
  labelStyle,
];

export const cyStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  width: '100vw',
  background: 'linear-gradient(210deg, rgba(5,30,48,1) 2%, rgba(0,0,0,1) 100%)',
  zIndex: 0,
};