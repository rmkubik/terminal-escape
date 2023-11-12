import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const WorldSeq = () => {
  return (
    <Sequence>
      <Line>World!</Line>
    </Sequence>
  );
};

const install = (commandLineInterface) => () => {
  commandLineInterface.stdout(WorldSeq);
  commandLineInterface.prompt();
};

export default install;
