import React from "react";
import { useState, useEffect } from "react";

function NoteSelect({ note, onChange }) {
  const [noteNumber, setNoteNumber] = useState(note.number);
  const [noteOctave, setOctave] = useState(note.octave);

  useEffect(() => {
    setNoteNumber(note.number);
    setOctave(note.octave);
  }, [note]);

  const handleOctave = (e) => {
    let val = parseInt(e.target.value);
    setOctave(val);
    onChange({ number: noteNumber, octave: val });
  };

  const handleNote = (e) => {
    let val = parseInt(e.target.value);
    setNoteNumber(val);
    onChange({ number: val, octave: noteOctave });
  };

  const octaves = [0, 1, 2, 3, 4, 5, 6, 7];
  const noteNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const noteNames = {
    1: "C",
    2: "C#",
    3: "D",
    4: "D#",
    5: "E",
    6: "F",
    7: "F#",
    8: "G",
    9: "G#",
    10: "A",
    11: "A#",
    12: "B",
  };
  const octaveOptions = octaves.map((o) => (
    <option key={o} value={o}>
      {o}
    </option>
  ));
  const noteOptions = noteNumbers.map((n) => (
    <option key={n} value={n}>
      {noteNames[n]}
    </option>
  ));

  return (
    <div className="fret settings">
      <select value={noteNumber} onChange={handleNote}>
        {noteOptions}
      </select>
      <select value={noteOctave} onChange={handleOctave}>
        {octaveOptions}
      </select>
    </div>
  );
}

export default NoteSelect;
