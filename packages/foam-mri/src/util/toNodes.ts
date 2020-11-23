export const toNodes = (entries: any) => {
  return entries.reduce((nodes: any, [notePath]: any[]) => {
    const newNode = {
      data: {
        id: notePath
      }
    };
    return [...nodes, newNode];
  }, []);
};