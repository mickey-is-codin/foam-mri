import { toHeatmapColors } from './colors';
import { clipTo } from '../util/fp';

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
const HEATMAP_RESOLUTION = 5;
const heatmapColors = toHeatmapColors(HEATMAP_RESOLUTION);
const nodeColors = [BASE_NODE_COLOR, ...heatmapColors];

const toBackgroundColor = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  const clippedHits = clipTo(10)(numSearchHits);
  return nodeColors[clippedHits];
};

export const toBaseGraphStyle = () => {
  return [
    {
      selector: 'node',
      style: {
        'background-color': toBackgroundColor,
        'label': 'data(id)',
        'width': 10,
        'height': 10,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#5d5d5d',
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