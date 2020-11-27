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

const toHeatmapRange = clipTo(HEATMAP_RESOLUTION);
const heatmapColors = toHeatmapColors(HEATMAP_RESOLUTION);
const nodeColors = [BASE_NODE_COLOR, ...heatmapColors];
const edgeColors = [BASE_EDGE_COLOR, BASE_EDGE_COLOR, ...allButLast(heatmapColors)];

// add conditional node size too

const toNodeBackgroundColor = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  const clippedHits = toHeatmapRange(numSearchHits);
  return nodeColors[clippedHits];
};

const toNodeSize = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  return numSearchHits === 0 ? 10 : (numSearchHits + 1) * 20;
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

const nodeStyle = {
  selector: 'node',
  style: {
    'background-color': toNodeBackgroundColor,
    'label': 'data(id)',
    'width': toNodeSize,
    'height': toNodeSize,
  }
};

const edgeStyle = {
  selector: 'edge',
  style: {
    'width': 3,
    'line-color': toEdgeColor,
    'curve-style': 'bezier'
  }
};

const labelStyle = {
  selector: 'label',
  style: {
    'color': '#ffffff',
  }
};

export const toBaseGraphStyle = () => [ 
  nodeStyle, 
  edgeStyle, 
  labelStyle,
];

export const cyStyle = {
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