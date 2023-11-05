import React, { useEffect, useRef, useState } from "react";
import Line from "./Line";

const Prompt = () => {
  const [value, setValue] = useState();
  const [clearCursor, setClearCursor] = useState(false);

  return (
    <>
      <Line inline>$</Line>
      {/* <Line inline typed clearCursor={clearCursor} /> */}
      <Line inline>
        <input
          type="text"
          autoFocus
          value={value}
          onChange={(e) => {
            setClearCursor(true);
            setValue(e.target.value);
          }}
        />
      </Line>
    </>
  );
};

export default Prompt;
