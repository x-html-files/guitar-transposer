import React from "react";
import Fret from "./Fret";
import NoteSelect from "./NoteSelect";
import { useState, useEffect } from "react";

function TString({ numberOfFrets }) {
  let frets = [];

  for (let i = 1; i <= numberOfFrets; i++) {
    frets.push(
      <div key={"fret" + i} className="fret txt">
        {i}
      </div>
    );
  }

  return (
    <div className={"gstring txt"}>
      <div key="fret settings" className="fret settings txt">
        Note / Octave
      </div>
      <div key="fret open" className="fret open txt">
        Open
      </div>
      {frets}
    </div>
  );
}

export default TString;
