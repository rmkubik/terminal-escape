import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const NotFileSeq = (fileName) => () => {
  return (
    <Sequence>
      <Line>Cannot parse non-file: "{fileName}"</Line>
    </Sequence>
  );
};

const CantParseTextSeq = () => {
  return (
    <Sequence>
      <Line>File already parsed!</Line>
    </Sequence>
  );
};

const ParseFileSeq = (content) => () => {
  return (
    <Sequence>
      <Line>{content}</Line>
    </Sequence>
  );
};

const parse = (commandLineInterface) => (fileName) => {
  const file = commandLineInterface.files.get(fileName);

  if (!file) {
    commandLineInterface.stdout(NotFileSeq(fileName));
    commandLineInterface.prompt();
    return;
  }

  if (file.extname === "txt") {
    commandLineInterface.stdout(CantParseTextSeq);
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(ParseFileSeq(file.content));
  commandLineInterface.prompt();
};

export default parse;
