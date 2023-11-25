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

const SuccessSeq = () => {
  return (
    <Sequence>
      <Line />
      <Line bold color="success">
        ACCESS GRANTED.
      </Line>
      <Line color="success">Welcome to SHIELD_OS, "MORPHEUS"</Line>
      <Line />
    </Sequence>
  );
};

const unlock = (commandLineInterface) => (passCode) => {
  if (!passCode) {
    commandLineInterface.stdout(NoPassCodeSeq);
    commandLineInterface.prompt();
    return;
  }

  if (passCode !== "bl!zz@rd") {
    commandLineInterface.stdout(InvalidPassCodeSeq);
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(SuccessSeq);
};

export default unlock;
