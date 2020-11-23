export const toEdges = (entries: any) => {
  return entries.reduce((edges: any, [notePath, note]: any[]) => {
    // const { path, content, links } = note;
    const newEdge = {
      data: {
        id: notePath
      }
    };
    return [...edges, newEdge];
  }, []);
};