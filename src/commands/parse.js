import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const InstalledDependenciesSeq = (deps) => () => {
  const parseDeps = deps.filter((dep) => dep.startsWith("@parse"));

  if (parseDeps.length === 0) {
    return (
      <Sequence>
        <Line>No "parse" dependencies installed.</Line>
      </Sequence>
    );
  }

  return (
    <Sequence flattenChildren>
      <Line>Installed "parse" dependencies:</Line>
      {parseDeps.map((dep) => (
        <Line key={dep}>{`* ${dep}`}</Line>
      ))}
    </Sequence>
  );
};

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

const NoParseDepInstalledSeq = (extname) => () => {
  return (
    <Sequence>
      <Line>ERROR: Failed to parse .{extname} file</Line>
      <Line>Dependency @parse/{extname} does not exist</Line>
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
  if (!fileName) {
    commandLineInterface.stdout(
      InstalledDependenciesSeq(commandLineInterface.dependencies.installed)
    );
    commandLineInterface.prompt();
    return;
  }

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

  if (
    !commandLineInterface.dependencies.isInstalled(`@parse/${file.extname}`)
  ) {
    commandLineInterface.stdout(NoParseDepInstalledSeq(file.extname));
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(ParseFileSeq(file.content));
  commandLineInterface.prompt();
};

export default parse;
