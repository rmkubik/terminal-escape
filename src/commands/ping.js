import React from "react";
import Line from "../components/Line";
import Sequence from "../components/Sequence";
import isValidHttpUrl from "../utils/urls/isValidHttpUrl";

const PingServerSeq = (url) => () => {
  return (
    <Sequence>
      <Line>Pinging "{url}"...</Line>
      <Line />
      <Line typed>[^200.^500.^100.^300.^100.^300.^200.^400]</Line>
      <Line />
      <Line>Connection established</Line>
      <Line />
      <Line>Ping Origin Location</Line>
      <Line delay={500}>Server: Portland, OR - CenturyLink</Line>
      <Line>IP: 18.884.123.85 {"<CenturyLink>"}</Line>
    </Sequence>
  );
};

const CannotReachUrlSeq = (url) => () => {
  return (
    <Sequence>
      <Line>Pinging "{url}"...</Line>
      <Line />
      <Line typed>[^200.^300.^300.^200.^400]</Line>
      <Line />
      <Line>Cannot reach server: "{url}"</Line>
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
    commandLineInterface.stdout(CannotReachUrlSeq(url));
    commandLineInterface.prompt();
    return;
  }

  commandLineInterface.stdout(PingServerSeq(url));
  commandLineInterface.prompt();
};

export default ping;
