export const injectDependency = async <T>(importFn: any): Promise<T> => {
  const module = await importFn;
  const name = Object.keys(module)[0];
  return module[name]() as T;
}
