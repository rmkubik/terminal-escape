import setSelectionRange from "./setSelectionRange";

// https://stackoverflow.com/questions/34968174/set-text-cursor-position-in-a-textarea
function setCursorToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}

export default setCursorToPos;
