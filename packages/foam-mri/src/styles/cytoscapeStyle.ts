import { toHeatmapColors } from './colors';
import { clipTo } from '../util/fp';

const BASE_NODE_COLOR = '#8b8b8b';
const HEATMAP_RESOLUTION = 20;
const heatmapColors = [BASE_NODE_COLOR, ...toHeatmapColors(HEATMAP_RESOLUTION)];

const toBackgroundColor = (node: any) => {
  const numSearchHits = node.data('searchHits').length;
  console.log('node: ', node._private.data.id, ' searchHits: ', numSearchHits);
  const clippedHits = clipTo(10)(numSearchHits);
  return heatmapColors[clippedHits];
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