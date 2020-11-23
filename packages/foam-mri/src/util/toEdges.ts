export const toEdges = (entries: any) => {
  return entries.reduce((edges: any, [notePath, note]: any[]) => {
    const { links } = note;
    const [fromId] = notePath.split('.');
    const newEdges = links.reduce((newEdges: any, link: any) => {
      return [...newEdges, {
        data: {
          id: `${fromId}-${link}`,
          source: fromId,
          target: link,
        }
      }];
    }, []);
    return [...edges, ...newEdges];
  }, []);
};