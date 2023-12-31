import React, { useEffect } from "react";
import Line from "./Line";
import arrayifyChildren from "../utils/react/arraifyChildren";
import styled from "styled-components";
import useGlobalClickOnce from "../utils/inputEvents/useGlobalClickOnce";
import Prompt from "./Prompt";
import { Unlocked } from "../commands/help";

function preProcessChildren({ children, flattenChildren }) {
  let processedChildren = arrayifyChildren(children);

  if (flattenChildren) {
    processedChildren = processedChildren.flat();
  }

  // Remove all children that
  // are not a Line React component
  processedChildren = processedChildren.filter((child) => {
    return (
      child?.type === Line ||
      child?.type === Prompt ||
      // Pulled from help file
      // Probably Sequence should have a
      // way to configure "valid children"
      // that inherit the interface properly
      child?.type === Unlocked
    );
  });

  return processedChildren;
}

const SequenceContainer = styled.div`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
`;

/**
 * The Sequence MUST have a static length of children
 * to operate correctly.
 *
 * It relies on index order of children which is brittle.
 */
const Sequence = ({
  children,
  flattenChildren,
  inline,
  onFinished = () => {},
}) => {
  const [currentChild, setCurrentChild] = React.useState(0);

  const onLineFinished = () => {
    setCurrentChild((prevCurrentChild) => prevCurrentChild + 1);
    // document.body.scrollTop = document.body.scrollHeight;
  };

  const preProcessedChildren = preProcessChildren({
    children,
    flattenChildren,
  });

  // useGlobalClickOnce(() => {
  //   setCurrentChild(preProcessedChildren.length);
  // });

  useEffect(() => {
    if (currentChild >= preProcessedChildren.length - 1) {
      onFinished();
    }
  }, [currentChild, preProcessedChildren.length]);

  const currentChildren = preProcessedChildren.slice(0, currentChild + 1);

  const boundChildren = currentChildren.map((child, index) => {
    return React.cloneElement(child, {
      key: index,
      onFinished: () => {
        child.props.onFinished?.();
        onLineFinished();
      },
    });
  });

  return <SequenceContainer inline={inline}>{boundChildren}</SequenceContainer>;
};

export default Sequence;
