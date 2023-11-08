import * as matter from "gray-matter";
import * as srcFiles from "./*.txt";

function areFilesEqual(a, b) {
  return a.name === b.name && a.extname === b.extname;
}

// Only works without any directory
function isFileAtPath(file, path = "") {
  const [fileName, extname] = path.split(".");

  return file.name === fileName && file.extname === extname;
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
  contains: (filePath) => {
    return FilesModel.get(filePath) !== undefined;
  },
};

export default FilesModel;
