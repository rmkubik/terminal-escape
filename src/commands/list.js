import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const ListFileNamesSeq = (fileNames) => () => {
  return (
    <Sequence>
      {fileNames.map((fileName) => (
        <Line>{fileName}</Line>
      ))}
    </Sequence>
  );
};

const list = (commandLineInterface) => (showHidden) => {
  let fileNames = commandLineInterface.files.getAllNames();

  if (!showHidden) {
    fileNames = fileNames.filter((fileName) => fileName[0] !== ".");
  }

  commandLineInterface.stdout(ListFileNamesSeq(fileNames));
  commandLineInterface.prompt();
};

export default list;
