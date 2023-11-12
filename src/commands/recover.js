import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";

const RecoveryAnswerOneSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      <Line>PW HINT: A type of severe weather pattern.</Line>
    </Sequence>
  );
};

const RecoveryAnswerTwoSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      <Line>PW HINT: All vowels should be replaced</Line>
      <Line>with special characters.</Line>
    </Sequence>
  );
};

const RecoveryAnswerThreeSeq = () => {
  return (
    <Sequence>
      <Line>Correct!</Line>
      <Line>PW HINT: A gaming company.</Line>
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

const recover =
  (commandLineInterface) =>
  (id, ...answerArgs) => {
    const answer = answerArgs.join(" ").toLowerCase();

    switch (true) {
      case !id:
      case !answer:
      default:
        commandLineInterface.stdout(IncorrectAnswerSeq);
        break;
      case id === "1" && answer === "oregon":
        commandLineInterface.stdout(RecoveryAnswerOneSeq);
        break;
      case id === "2" && answer === "the matrix":
        commandLineInterface.stdout(RecoveryAnswerTwoSeq);
        break;
      case id === "3" && answer === "toyota":
        commandLineInterface.stdout(RecoveryAnswerThreeSeq);
        break;
    }

    commandLineInterface.prompt();
  };

export default recover;
