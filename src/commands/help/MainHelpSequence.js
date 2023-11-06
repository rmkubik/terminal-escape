import React from "react";
import Sequence from "../../components/Sequence";
import Line from "../../components/Line";

const MainHelpSequence = () => {
  return (
    <Sequence>
      <Line>Try entering a command to get more information.</Line>
      <Line>ex. "help unlock"</Line>
    </Sequence>
  );
};

export default MainHelpSequence;
