import help from "./help";
import print from "./print";
import unlock from "./unlock";

const bindCommands = (commandLineInterface) => {
  return {
    help: help(commandLineInterface),
    unlock: unlock(commandLineInterface),
    print: print(commandLineInterface),
  };
};

export default bindCommands;
