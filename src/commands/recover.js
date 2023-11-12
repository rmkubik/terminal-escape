import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const hints = {
  1: <Line>PW HINT: A type of severe weather pattern.</Line>,
  2: (
    <Line>PW HINT: All vowels should be replaced with special characters.</Line>
  ),
  3: <Line>PW HINT: A gaming company.</Line>,
};
const hintsUnlocked = {
  1: false,
  2: false,
  3: false,
};

const RecoveryAnswerOneSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      {hints[1]}
    </Sequence>
  );
};

const RecoveryAnswerTwoSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      {hints[2]}
    </Sequence>
  );
};

const RecoveryAnswerThreeSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      {hints[3]}
    </Sequence>
  );
};

const IncorrectAnswerSeq = () => {
  return (
    <Sequence>
      <Line>Incorrect.</Line>
    </Sequence>
  );
};

const ShowAnsweredSeq = () => () => {
  return (
    <Sequence flattenChildren>
      <Line>Recovery Question HINTS:</Line>
      {hintsUnlocked[1] && [hints[1], <Line />]}
      {hintsUnlocked[2] && [hints[2], <Line />]}
      {hintsUnlocked[3] && [hints[3], <Line />]}
    </Sequence>
  );
};

const recover =
  (commandLineInterface) =>
  (id, ...answerArgs) => {
    const answer = answerArgs.join(" ").toLowerCase();

    switch (true) {
      case !answer:
        commandLineInterface.stdout(ShowAnsweredSeq());
        break;
      case !id:
      default:
        commandLineInterface.stdout(IncorrectAnswerSeq);
        break;
      case id === "1" && answer === "oregon":
        hintsUnlocked[1] = true;
        commandLineInterface.stdout(RecoveryAnswerOneSeq);
        break;
      case id === "2" && answer === "the matrix":
        hintsUnlocked[2] = true;
        commandLineInterface.stdout(RecoveryAnswerTwoSeq);
        break;
      case id === "3" && answer === "toyota":
        hintsUnlocked[3] = true;
        commandLineInterface.stdout(RecoveryAnswerThreeSeq);
        break;
    }

    commandLineInterface.prompt();
  };

export default recover;
