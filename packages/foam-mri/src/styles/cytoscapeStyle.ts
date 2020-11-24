export const toBaseGraphStyle = () => {
  return [
    {
      selector: 'node',
      style: {
        'background-color': '#8b8b8b',
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