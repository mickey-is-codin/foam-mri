export const toNodes = (entries: any) => {
  return entries.reduce((nodes: any, [notePath]: any[]) => {
    const [id] = notePath.split('.');
    const newNode = {
      data: {
        id
      }
    };
    return [...nodes, newNode];
  }, []);
};