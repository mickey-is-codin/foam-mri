import cytoscape from 'cytoscape';
import { toHeatmapColors } from './colors';
import { ToNumber } from '../util/types';
import { clipTo, min } from '../util/fp';
import { 
  BASE_NODE_COLOR, 
  BASE_EDGE_COLOR, 
  HEATMAP_RESOLUTION, 
  MAX_EDGE_WIDTH,
  NODE_HOVER_SIZE,
  NODE_SIZE_MULTIPLIER,
  NODE_SIZE_OFFSET,
  NODE_DEFAULT_SIZE,
  EDGE_DEFAULT_WIDTH,
  EDGE_WIDTH_OFFSET,
} from '../util/constants';

// Uncomment for custom heat map
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

const toHeatmapRange: ToNumber = clipTo(HEATMAP_RESOLUTION);
const toEdgeRange: ToNumber = clipTo(MAX_EDGE_WIDTH);
const heatmapColors: string[] = toHeatmapColors(HEATMAP_RESOLUTION);
const nodeColors: string[] = [BASE_NODE_COLOR, ...heatmapColors];
const edgeColors: string[] = [BASE_EDGE_COLOR, ...heatmapColors];
// If offset between edge and node colors desired:
// const edgeColors: string[] = [BASE_EDGE_COLOR, BASE_EDGE_COLOR, ...allButLast(heatmapColors)];

const toNodeBackgroundColor = (node: cytoscape.NodeSingular): string => {
  const numSearchHits: number = node.data('searchHits').length;
  const clippedHits: number = toHeatmapRange(numSearchHits);
  return nodeColors[clippedHits];
};

const toNodeSize = (node: cytoscape.NodeSingular): number => {
  const numSearchHits: number = node.data('searchHits').length;
  const clippedHits: number = toHeatmapRange(numSearchHits) + NODE_SIZE_OFFSET;
  return numSearchHits ? clippedHits * NODE_SIZE_MULTIPLIER : NODE_DEFAULT_SIZE;
};

const toNodeLabel = (node: cytoscape.NodeSingular): string => {
  const id: string = node.data('id');
  const numSearchHits: number = node.data('searchHits').length;
  return numSearchHits ? id : '';
};

const toEdgeColor = (edge: cytoscape.EdgeSingular): string => {
  const numSourceSearchHits: number = edge.data('sourceNode').data.searchHits.length;
  const numTargetSearchHits: number = edge.data('targetNode').data.searchHits.length;
  const meanHits = min(numSourceSearchHits, numTargetSearchHits);
  const clippedHits: number = toHeatmapRange(meanHits);
  return edgeColors[clippedHits];
};

const toEdgeWidth = (edge: cytoscape.EdgeSingular): number => {
  const numSourceSearchHits: number = edge.data('sourceNode').data.searchHits.length;
  const numTargetSearchHits: number = edge.data('targetNode').data.searchHits.length;
  const meanHits = min(numSourceSearchHits, numTargetSearchHits) + EDGE_WIDTH_OFFSET;
  const clippedHits: number = toEdgeRange(meanHits);
  return meanHits ? clippedHits : EDGE_DEFAULT_WIDTH;
}; 

const nodeStyle: cytoscape.Stylesheet = {
  selector: 'node',
  style: {
    'background-color': toNodeBackgroundColor,
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
    'width': NODE_HOVER_SIZE,
    'height': NODE_HOVER_SIZE,
  }
};

const edgeStyle: cytoscape.StylesheetStyle = {
  selector: 'edge',
  style: {
    'width': toEdgeWidth,
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