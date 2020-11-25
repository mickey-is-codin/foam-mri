
// Custom styling achieved by adding attributes to given nodes
// Example: "background-color": node => node.data('error') ? 'red' : 'green';
// My use: assign a color from a map based on number of matches to search query
// Use an attr like "searchHits" that's initialized to zero
// data: {
//   id: 'node-id',
//   label: 'node-label',
//   searchHits: 10
// };
// Actually might make more sense to just store hits as the actual paragraph context 
// Then we can just iterate through and check the length of the hits array
// data: {
//   id: 'node-id',
//   label: 'node-label',
//   searchHits: [paragraph1, paragraph2]
// };

export const toNodes = (entries: any) => {
  return entries.reduce((nodes: any, [notePath]: any[]) => {
    const [id] = notePath.split('.');
    const newNode = {
      data: {
        id,
        searchHits: []
      }
    };
    return [...nodes, newNode];
  }, []);
};