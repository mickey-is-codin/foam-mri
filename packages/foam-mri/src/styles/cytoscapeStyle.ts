import { toHeatmapColors } from './colors';
import { clipTo, intMean, allButLast } from '../util/fp';

// Uncomment for custom color interp heat map
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

const BASE_NODE_COLOR = '#8b8b8b';
const BASE_EDGE_COLOR = '#5d5d5d';
const HEATMAP_RESOLUTION = 20;
const toHeatmapRange = clipTo(HEATMAP_RESOLUTION);
const heatmapColors = toHeatmapColors(HEATMAP_RESOLUTION);
const nodeColors = [BASE_NODE_COLOR, ...heatmapColors];
const edgeColors = [BASE_EDGE_COLOR, BASE_EDGE_COLOR, ...allButLast(heatmapColors)];

const toNodeBackgroundColor = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  const clippedHits = toHeatmapRange(numSearchHits);
  return nodeColors[clippedHits];
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

export const toBaseGraphStyle = () => {
  return [
    {
      selector: 'node',
      style: {
        'background-color': toNodeBackgroundColor,
        'label': 'data(id)',
        'width': 10,
        'height': 10,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': toEdgeColor,
        'curve-style': 'bezier'
      }
    },
    {
      selector: 'label',
      style: {
        'color': '#ffffff',
      }
    }
  ];
};