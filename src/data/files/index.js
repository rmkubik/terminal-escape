import * as matter from "gray-matter";
import * as srcFiles from "./*.txt";

function areFilesEqual(a, b) {
  return a.name === b.name && a.extname === b.extname;
}

// Only works without any directory
function isFileAtPath(file, path = "") {
  let effectivePath = path;

  const isHiddenFile = path[0] === ".";
  if (isHiddenFile) {
    effectivePath = effectivePath.substring(1);
  }

  const [fileName, extname] = effectivePath.split(".");

  const areBothExtnamesFalsy = !Boolean(file.extname) && !Boolean(extname);
  const doesExtnameMatch = file.extname === extname || areBothExtnamesFalsy;

  return file.name === fileName && doesExtnameMatch;
}

const FilesModel = {
  files: Object.entries(srcFiles).map(([fileName, content]) => {
    const parsedFile = matter(content);

    return {
      name: fileName,
      extname: "txt", // default to txt file
      hidden: false,
      content: parsedFile.content,
      ...parsedFile.data,
    };
  }),
  get: (filePath) => {
    return FilesModel.files.find((file) => isFileAtPath(file, filePath));
  },
  getAllNames: () => {
    return FilesModel.files
      .map((file) => {
        let fileName = "";

        if (file.hidden) {
          fileName += ".";
        }

        fileName += file.name;

        if (file.extname) {
          fileName += "." + file.extname;
        }

        return fileName;
      })
      .sort();
  },
  contains: (filePath) => {
    return FilesModel.get(filePath) !== undefined;
  },
};

export default FilesModel;
