import * as commands from "./*.js";

const commandEntries = Object.entries(commands).filter(
  ([key]) => key !== "index"
);
const commandCount = commandEntries.length;

const bindCommands = (commandLineInterface) => {
  return commandEntries.reduce((boundCommands, [key, currentCommand]) => {
    return {
      ...boundCommands,
      [key]: currentCommand.default(commandLineInterface),
    };
  }, {});
};

export default bindCommands;
export { commandCount };
