import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

// IDEA::
// Invalid file formats
// this can only print .txt files
// you might need to convert something else to
// .txt for this to print it
//
// You need to pass a param to SHOW to see hidden files

const PrintFileSeq = (content) => () => {
  return (
    <Sequence>
      <Line>{content}</Line>
    </Sequence>
  );
};

const PrintTextSeq = (content) => () => {
  return (
    <Sequence>
      <Line>{content}</Line>
    </Sequence>
  );
};

const print =
  (commandLineInterface) =>
  (...textOrFileNames) => {
    // If first one is a filename, print it out
    textOrFileNames.forEach((textOrFileName) => {
      if (commandLineInterface.files.contains(textOrFileName)) {
        const file = commandLineInterface.files.get(textOrFileName);
        commandLineInterface.stdout(PrintFileSeq(file.content));
        return;
      }

      // Otherwise print the text
      commandLineInterface.stdout(PrintTextSeq(textOrFileName));
    });

    commandLineInterface.prompt();
  };

export default print;
