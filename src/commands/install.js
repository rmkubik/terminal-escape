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
    setTimeout(() => {
      commandLineInterface.stdout(DepDoesNotExistSeq(dependency));
      commandLineInterface.prompt();
    }, 800);
    return;
  }

  commandLineInterface.dependencies.install(dependency);
  commandLineInterface.stdout(InstallDepSeq(dependency));

  // This timeout roughly matches the length of the
  // dots in the install sequence.
  setTimeout(() => commandLineInterface.prompt(), 4000);
};

export default install;
