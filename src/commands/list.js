import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const ListFileNamesSeq = (fileNames) => () => {
  return (
    <Sequence>
      {fileNames.map((fileName) => (
        <Line key={fileName}>{fileName}</Line>
      ))}
    </Sequence>
  );
};

const InvalidListOptSeq = () => {
  return (
    <Sequence>
      <Line>Invalid "list" argument. Check LIST_OPT env var</Line>
      <Line>to see configured arguments. Default suggested</Line>
      <Line>command for viewing is "print" on SHIELD_OS</Line>
      <Line>versions more recent than 2.3.0. Check OS_VERSION</Line>
      <Line>var for current version.</Line>
    </Sequence>
  );
};

const list = (commandLineInterface) => (showHidden) => {
  if (showHidden && showHidden !== "hidden") {
    commandLineInterface.stdout(InvalidListOptSeq);
    commandLineInterface.prompt();
    return;
  }

  let fileNames = commandLineInterface.files.getAllNames();

  if (showHidden !== "hidden") {
    fileNames = fileNames.filter((fileName) => fileName[0] !== ".");
  }

  commandLineInterface.stdout(ListFileNamesSeq(fileNames));
  commandLineInterface.prompt();
};

export default list;
