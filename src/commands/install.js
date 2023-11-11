import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const InstallDepSeq = (dependency) => () => {
  return (
    <Sequence>
      <Line>Found package: {dependency}</Line>
      <Line>Starting installation</Line>
      <Line />
      <Line typed>
        [^200.^500.^100.^300.^200.^400.^200.^500.^100.^300.^200.^400]
      </Line>
      <Line />
      <Line>added: 1 new package</Line>
      <Line />
      <Line>"{dependency}" installed to local</Line>
      <Line>found 0 vulnerabilities</Line>
    </Sequence>
  );
};

const DepDoesNotExistSeq = (dependency) => () => {
  return (
    <Sequence>
      <Line>code: E404</Line>
      <Line>404 Not Found</Line>
      <Line>404</Line>
      <Line>404 "{dependency}" is not in registry</Line>
      <Line>404</Line>
    </Sequence>
  );
};

const install = (commandLineInterface) => (dependency) => {
  const isValidDep = commandLineInterface.dependencies.isValid(dependency);

  if (!isValidDep) {
    commandLineInterface.stdout(DepDoesNotExistSeq(dependency));
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.dependencies.install(dependency);
  commandLineInterface.stdout(InstallDepSeq(dependency));
  commandLineInterface.prompt();
};

export default install;
