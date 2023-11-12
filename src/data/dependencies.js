const DependencyModel = {
  validDeps: [
    "@parse/json",
    "@parse/md",
    "@parse/xml",
    "@parse/csv",
    "@parse/yaml",
  ],
  installed: [],
  isValid: (dep) => {
    return DependencyModel.validDeps.includes(dep);
  },
  isInstalled: (dep) => {
    return DependencyModel.installed.includes(dep);
  },
  install: (dep) => {
    if (!DependencyModel.validDeps.includes(dep)) {
      return;
    }

    DependencyModel.installed.push(dep);
  },
};

export default DependencyModel;
