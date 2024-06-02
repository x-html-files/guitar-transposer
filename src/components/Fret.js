import React from "react";
import { useState, useEffect } from "react";

function Fret({
  isEditable,
  fretNumber,
  note,
  isOpen,
  isSet,
  callBack,
  isText,
  hideOctave,
}) {
  const [isOn, setIndex] = useState(isSet);

  useEffect(() => {
    setIndex(isSet);
  }, [isSet]);

  //if (!isText && !isOpen) console.log(note, isSet, isOn);

  const marked = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

  const notes = {
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

  function handleClick() {
    if (!isEditable) return;
    let remove = isOn;

    if (typeof callBack !== "undefined") {
      //console.log(callBack);
      callBack(note, remove);
    }

    setIndex(!isOn);
  }

  let className = "fret";

  if (isText) {
    className += " txt";
  }
  if (isOpen) {
    className += " open";
  }

  if (isEditable) {
    className += " clickable";
  }

  if (marked.includes(fretNumber, 0)) {
    className += " marked";
  }

  const el = isEditable ? (
    <div className={className} onClick={handleClick}>
      {isOn && !hideOctave ? <span>{note.octave}</span> : ""}
      {isOn ? <span>{notes[note.number]}</span> : " "}
    </div>
  ) : (
    <div className={className}>
      <span>
        {isSet || isText ? note.octave + "" + notes[note.number] : " "}
      </span>
    </div>
  );

  return (
    <div className={className} onClick={handleClick}>
      {isOn ? (
        <div className="note">
          <span>{notes[note.number]}</span>
          {!hideOctave ? <span>{note.octave}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export default Fret;
