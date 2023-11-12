import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";
import env from "../data/env.yaml";

const PrintFileSeq = (content) => () => {
  return (
    <Sequence>
      <Line>{content}</Line>
    </Sequence>
  );
};

const PrintInvalidExtnameSeq = (file) => () => {
  return (
    <Sequence>
      <Line>
        ERR: Print cannot parse "{file.name}.{file.extname}"
      </Line>
      <Line>ERR:</Line>
      <Line>ERR: Invalid extension type.</Line>
      <Line />
      <Line>Check "parse" engine configuration</Line>
      <Line>setting in "print_config.json"</Line>
    </Sequence>
  );
};

const PrintTextSeq = (content) => () => {
  return (
    <Sequence>
      <Line>
        {typeof content === "string" ? content : JSON.stringify(content)}
      </Line>
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

        if (file.extname !== "txt") {
          commandLineInterface.stdout(PrintInvalidExtnameSeq(file));
          return;
        }

        commandLineInterface.stdout(PrintFileSeq(file.content));
        return;
      }

      let outputText = textOrFileName;
      if (env[textOrFileName] !== undefined) {
        outputText = env[textOrFileName];
      }

      commandLineInterface.stdout(PrintTextSeq(outputText));
    });

    commandLineInterface.prompt();
  };

export default print;
