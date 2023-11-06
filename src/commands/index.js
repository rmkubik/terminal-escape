import help from "./help";

const bindCommands = (commandLineInterface) => {
  return {
    help: help(commandLineInterface),
  };
};

export default bindCommands;
