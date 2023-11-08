import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const MainHelpSequence = () => {
  return (
    <Sequence>
      <Line>Try entering a command to get more information.</Line>
      <Line>ex. "help unlock"</Line>
    </Sequence>
  );
};

const UnrecognizedCommandHelpSequence = (command) => () => {
  return (
    <Sequence>
      <Line>There is no help text for the command: "{command}"</Line>
      <Line>Try a valid command like "test"</Line>
    </Sequence>
  );
};

const help = (commandLineInterface) => (command) => {
  if (!command) {
    commandLineInterface.stdout(MainHelpSequence);
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(UnrecognizedCommandHelpSequence(command));
  commandLineInterface.prompt();
};

export default help;
