const DependencyModel = {
  validDeps: ["@parse/json", "@parse/xml"],
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
