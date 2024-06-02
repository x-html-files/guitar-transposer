import React from "react";
import Fret from "./Fret";
import NoteSelect from "./NoteSelect";
import { useState, useEffect } from "react";

function GString({
  startingNote,
  numberOfFrets,
  isEditable,
  callBack,
  notesToShow,
  ignoreOctaves,
  hideOctave,
  className,
}) {
  if (typeof notesToShow === "undefined") {
    notesToShow = [];
  }

  //console.log("SSS note", startingNote);

  const [stringNote, setStringNote] = useState(startingNote);

  useEffect(() => {
    setStringNote(startingNote);
  }, [startingNote]);

  const noteIsFound = (note) => {
    if (ignoreOctaves) {
      return notesToShow.findIndex((p) => p.number == note.number) >= 0;
    }

    return (
      notesToShow.findIndex(
        (p) => p.number == note.number && p.octave == note.octave
      ) >= 0
    );
  };

  let frets = [];

  for (let i = 0; i < numberOfFrets; i++) {
    let octaveIndex = Math.floor((stringNote.number + i) / 12);

    let noteNumber = ((stringNote.number + i) % 12) + 1;

    let note = {
      number: noteNumber,
      octave: stringNote.octave + octaveIndex,
    };

    frets.push(
      <Fret
        key={"fret" + i}
        isEditable={isEditable}
        note={note}
        fretNumber={i + 1}
        callBack={callBack}
        isSet={noteIsFound(note)}
        hideOctave={hideOctave}
      />
    );
  }

  const onStartingNoteChange = (note) => {
    setStringNote(note);
    //console.log("starting note", note);
  };

  //console.log("SSS string note", stringNote);

  return (
    <div className={"gstring " + className}>
      <NoteSelect note={stringNote} onChange={onStartingNoteChange} />
      <Fret
        key={"fretStart"}
        isEditable={isEditable}
        fretNumber={0}
        note={stringNote}
        isOpen={true}
        callBack={callBack}
        isSet={noteIsFound(stringNote)}
        hideOctave={hideOctave}
      />
      {frets}
    </div>
  );
}

export default GString;
