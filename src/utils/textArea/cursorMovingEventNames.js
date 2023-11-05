// https://stackoverflow.com/questions/53999384/javascript-execute-when-textarea-caret-is-moved/53999418#53999418
export default [
  "keyup", // Every character written AND navigation chars (arrow keys, etc.)
  "mousedown", // Click down
  "touchstart", // Mobile
  "input", // Other input events
  "paste", // Clipboard actions
  "cut",
  "mousemove", // Selection, dragging text
  "select", // Some browsers support this event
  "selectstart", // Some browsers support this event
];
