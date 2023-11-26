import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";
import { commandCount } from "./index";
import env from "../data/env.yaml";

const helpedCommands = new Set(["help", "hello"]);
export const printedVariables = new Set();

export const Unlocked = () => {
  const unlocked = [];

  if (helpedCommands.size > 0) {
    unlocked.push(
      <Line>
        found commands ({helpedCommands.size}/{commandCount}):{" "}
        {Array.from(helpedCommands).join(", ")}
      </Line>
    );
  }

  if (printedVariables.size > 0) {
    const varCount = Object.values(env).length;
    unlocked.push(
      <Line>
        found vars ({printedVariables.size}/{varCount}):{" "}
        {Array.from(printedVariables).join(", ")}
      </Line>
    );
  }

  return unlocked;
};

const MainHelpSequence = () => {
  return (
    <Sequence flattenChildren>
      <Line>Try entering a command to get more information.</Line>
      <Line>ex. "help unlock"</Line>
      <Line />
      <Unlocked />
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
    <Sequence flattenChildren>
      <Line>With no arguments, the "list" command shows the</Line>
      <Line>contents of a directory.</Line>
      <Line />
      <Line>Extra argument(s) are supported as indicated by</Line>
      <Line>the LIST_OPT env var.</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const PrintHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>The "print" command will display the provided files and</Line>
      <Line>environment variables.</Line>
      <Line />
      <Line>e.x. print test.txt</Line>
      <Line />
      <Line>Print provides a system-wide configuration file named:</Line>
      <Line>"print_config.json"</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const UnlockHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>
        The "unlock" command will disable the Shield OS monitoring program
      </Line>
      <Line>and allow unfettered access to the root machine.</Line>
      <Line />
      <Line>Provided the correct pass code is provided.</Line>
      <Line />
      <Line>If locked out, try "recover" command.</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const ParseHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>"parse" provides an ecosystem of dependencies capable of</Line>
      <Line>parsing many non-text file formats.</Line>
      <Line />
      <Line>Configure "parse" dependency installer with "INSTALLER"</Line>
      <Line>and "INSTALLER_SERVER" env variables.</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const RecoverHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>"recover" provides password hints if correct</Line>
      <Line>
        answers are provided as per the <strong>.shield_os.json</strong>
      </Line>
      <Line>disaster recovery configuration file.</Line>
      <Line />
      <Line>Default file name can be overwritten with environment</Line>
      <Line>variable RECOVERY_FILE_PATH.</Line>
      <Line />
      <Line>e.x. recover 1 answer</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const PingHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>"ping" is a test command that checks if</Line>
      <Line>you're capable of reaching the provided</Line>
      <Line>URL.</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const InstallHelpSeq = () => {
  return (
    <Sequence flattenChildren>
      <Line>"install" integrates with the global Shield OS</Line>
      <Line>dependency library.</Line>
      <Line />
      <Line>This requires a network connection. Shield OS provides</Line>
      <Line>the "ping" command to assist with network connection</Line>
      <Line>verification.</Line>
      <Line />
      <Line>Provide a dependency name to install it locally.</Line>
      <Line />
      <Unlocked />
    </Sequence>
  );
};

const help = (commandLineInterface) => (command) => {
  if (!command) {
    commandLineInterface.stdout(MainHelpSequence);
    commandLineInterface.prompt();
    return;
  }

  let shouldAddCommand = true;

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
    case "parse":
      commandLineInterface.stdout(ParseHelpSeq);
      break;
    case "recover":
      commandLineInterface.stdout(RecoverHelpSeq);
      break;
    case "ping":
      commandLineInterface.stdout(PingHelpSeq);
      break;
    case "install":
      commandLineInterface.stdout(InstallHelpSeq);
      break;
    default:
      shouldAddCommand = false;
      commandLineInterface.stdout(UnrecognizedCommandHelpSequence(command));
      break;
  }

  if (shouldAddCommand) {
    helpedCommands.add(command);
  }

  commandLineInterface.prompt();
};

export default help;
