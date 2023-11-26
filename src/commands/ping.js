import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";
import isValidHttpUrl from "../utils/urls/isValidHttpUrl";

const PingServerSeq = (url, focus) => () => {
  return (
    <Sequence>
      <Line onFinished={focus}>Pinging "{url}"...</Line>
      <Line onFinished={focus} />
      <Line onFinished={focus} typed>
        [^200.^500.^100.^300.^100.^300.^200.^400]
      </Line>
      <Line onFinished={focus} />
      <Line onFinished={focus}>Connection successfully established!</Line>
      <Line onFinished={focus} />
      <Line onFinished={focus}>Ping Origin Location</Line>
      <Line onFinished={focus} delay={500}>
        Server: Portland, OR, U.S.A. - CenturyLink
      </Line>
      <Line onFinished={focus}>IP: 18.884.123.85 {"<CenturyLink>"}</Line>
    </Sequence>
  );
};

const CannotReachUrlSeq = (url, focus) => () => {
  return (
    <Sequence>
      <Line onFinished={focus}>Pinging "{url}"...</Line>
      <Line onFinished={focus} />
      <Line onFinished={focus} typed>
        [^200.^300.^300.^200.^400]
      </Line>
      <Line onFinished={focus} />
      <Line onFinished={focus}>Cannot reach server: "{url}"</Line>
    </Sequence>
  );
};

const InvalidUrlSeq = (url) => () => {
  return (
    <Sequence>
      <Line>ERROR: Not a valid URL: "{url}"</Line>
    </Sequence>
  );
};

const ping = (commandLineInterface) => (url) => {
  if (!isValidHttpUrl(url)) {
    commandLineInterface.stdout(InvalidUrlSeq(url));
    commandLineInterface.prompt();
    return;
  }

  // Very weak test to verify that there's at
  // least _SOME_ dot in the URL's hostname.
  // This is easily bypass-able but should give
  // some small semblance of verisimilitude.
  if (!new URL(url).host.includes(".")) {
    commandLineInterface.stdout(
      CannotReachUrlSeq(url, commandLineInterface.focus)
    );
    // Timeout roughly matches
    // the length of dots in the
    // failed ping sequence.
    setTimeout(() => commandLineInterface.prompt(), 1800);
    return;
  }

  commandLineInterface.stdout(PingServerSeq(url, commandLineInterface.focus));
  // Timeout roughly matches
  // the length of dots and delays
  // in the ping sequence.
  setTimeout(() => commandLineInterface.prompt(), 3000);
};

export default ping;
