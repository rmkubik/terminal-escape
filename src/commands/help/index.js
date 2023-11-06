import MainHelpSequence from "./mainHelpSequence";

const help = (commandLineInterface) => (command) => {
  if (!command) {
    commandLineInterface.stdout(MainHelpSequence);
    return;
  }
};

export default help;
