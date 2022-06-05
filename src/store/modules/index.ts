const allModules = import.meta.globEager('./*/index.ts');
const modules = {} as any;
Object.keys(allModules).forEach((path) => {
  const fileName = path.split('/')[1];
  modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path];
});

// export default modules
import asyncRoute from './asyncRoute';
import user from './user';
import tabsView from './tabsView';
import lockscreen from './lockscreen';

export default {
  asyncRoute,
  user,
  tabsView,
  lockscreen,
};
