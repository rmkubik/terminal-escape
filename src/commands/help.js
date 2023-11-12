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
      <Line>The "list" command shows the contents of this directory.</Line>
      <Line />
      <Line>Extra argument(s) are supported as indicated by </Line>
      <Line>the LIST_OPT env var.</Line>
    </Sequence>
  );
};

const PrintHelpSeq = () => {
  return (
    <Sequence>
      <Line>The "print" command will display the provided files and</Line>
      <Line>environment variables.</Line>
      <Line />
      <Line>e.x. print test.txt</Line>
      <Line />
      <Line>Print provides a system-wide configuration file named:</Line>
      <Line>"print_config.json"</Line>
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
      <Line />
      <Line>Provided the correct pass code is provided.</Line>
      <Line />
      <Line>If locked out, try "recover" command.</Line>
    </Sequence>
  );
};

const ParseHelpSeq = () => {
  return (
    <Sequence>
      <Line>"parse" provides an ecosystem of dependencies capable of</Line>
      <Line>parsing many non-text file formats.</Line>
      <Line />
      <Line>Configure "parse" dependency installer with "INSTALLER"</Line>
      <Line>and "INSTALLER_SERVER" env variables.</Line>
    </Sequence>
  );
};

const RecoverHelpSeq = () => {
  return (
    <Sequence>
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
    </Sequence>
  );
};

const PingHelpSeq = () => {
  return (
    <Sequence>
      <Line>"ping" is a test command that checks if</Line>
      <Line>you're capable of reaching the provided</Line>
      <Line>URL.</Line>
    </Sequence>
  );
};

const InstallHelpSeq = () => {
  return (
    <Sequence>
      <Line>"install" integrates with the global Shield OS</Line>
      <Line>dependency library.</Line>
      <Line />
      <Line>This requires a network connection. Shield OS provides</Line>
      <Line>the "ping" command to assist with network connection</Line>
      <Line>verification.</Line>
      <Line />
      <Line>Provide a dependency name to install it locally.</Line>
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
      commandLineInterface.stdout(UnrecognizedCommandHelpSequence(command));
      break;
  }

  commandLineInterface.prompt();
};

export default help;
