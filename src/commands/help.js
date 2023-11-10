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
      <Line>Try a valid command like "list"</Line>
    </Sequence>
  );
};

const ListHelpSeq = () => {
  return (
    <Sequence>
      <Line>The "list" command will show the contents of this directory.</Line>
    </Sequence>
  );
};

const PrintHelpSeq = () => {
  return (
    <Sequence>
      <Line>The "print" command will display the provided content.</Line>
    </Sequence>
  );
};

const UnlockHelpSeq = () => {
  return (
    <Sequence>
      <Line>
        The "unlock" command will disable the Shield OS monitoring program
      </Line>
      <Line>and allow unfettered access to the root machine.</Line>
      <Line></Line>
      <Line>Provided the correct pass code is provided.</Line>
    </Sequence>
  );
};

const help = (commandLineInterface) => (command) => {
  if (!command) {
    commandLineInterface.stdout(MainHelpSequence);
    commandLineInterface.prompt();
    return;
  }

  switch (command) {
    case "list":
      commandLineInterface.stdout(ListHelpSeq);
      break;
    case "print":
      commandLineInterface.stdout(PrintHelpSeq);
      break;
    case "unlock":
      commandLineInterface.stdout(UnlockHelpSeq);
      break;
    default:
      commandLineInterface.stdout(UnrecognizedCommandHelpSequence(command));
      break;
  }

  commandLineInterface.prompt();
};

export default help;
