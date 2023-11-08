import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const NoPassCodeSeq = () => {
  return (
    <Sequence>
      <Line>
        You did not provide a pass code. "unlock" requires a pass code.
      </Line>
    </Sequence>
  );
};

const InvalidPassCodeSeq = () => {
  return (
    <Sequence>
      <Line>Invalid pass code.</Line>
    </Sequence>
  );
};

const unlock = (commandLineInterface) => (passCode) => {
  if (!passCode) {
    commandLineInterface.stdout(NoPassCodeSeq);
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(InvalidPassCodeSeq);
  commandLineInterface.prompt();
};

export default unlock;
