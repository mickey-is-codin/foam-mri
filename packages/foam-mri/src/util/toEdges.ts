// Similar to nodes, we want to conditionally style based on search hits
// If the source and target of an edge both contain >= 1 hit then style

export const toEdges = (entries: any, nodes: any) => {
  return entries.reduce((edges: any, [notePath, note]: any[]) => {
    const { links } = note;
    const [fromId] = notePath.split('.');
    const newEdges = links.reduce((newEdges: any, link: any) => {
      return [...newEdges, {
        data: {
          id: `${fromId}-${link}`,
          source: fromId,
          target: link,
          sourceNode: nodes.find(({data: { id }} : any) => id === fromId),
          targetNode: nodes.find(({data: { id }} : any) => id === link),
        }
      }];
    }, []);
    return [...edges, ...newEdges];
  }, []);
};