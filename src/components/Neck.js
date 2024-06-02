import React from "react";
import GString from "./GString";
import TString from "./TString";
import { useState, useId, useEffect } from "react";
import { tunings } from "../data/tunings";

function Neck({
  tuning,
  isEditable,
  numberOfFrets,
  notesCallBack,
  notesToShow,
  ignoreOctaves,
  hideOctave,
  extendedSettings,
  settingsCallback,
}) {
  const defaultNumberOfStrings = tunings[tuning].length;
  const defaultStartingNote = { number: 1, octave: 3 };

  const [tuningKey, setTuningKey] = useState(tuning);
  const [neckTuning, setNeckTuning] = useState(tunings[tuningKey]);

  const [numberOfStrings, setNumberOfStrings] = useState(
    defaultNumberOfStrings
  );

  useEffect(() => {
    //setIndex(isSet);
  }, [tuningKey]);

  const stringsInputId = useId();
  const stringsPreId = useId();

  const handleStrings = (e) => {
    let val = e.target.value;

    if (val < 1 || val > 12) {
      val = val = defaultNumberOfStrings;
    }

    setNumberOfStrings(val);
  };

  const handleTuning = (e) => {
    let val = e.target.value;
    //console.log("handleTuning", val);

    setTuningKey(val);
    setNeckTuning(tunings[val]);
    setNumberOfStrings(tunings[val].length);
  };

  let strings = [];

  for (let i = 0; i < numberOfStrings; i++) {
    let strSetting = neckTuning[i];

    if (typeof strSetting === "undefined") {
      strSetting = defaultStartingNote;
    }

    let className = "";

    if (i === 0) className = "up";
    if (i === numberOfStrings - 1) className = "bottom";

    //console.log("string ", strSetting);

    strings.push(
      <GString
        className={className}
        key={"string" + i}
        startingNote={strSetting}
        numberOfFrets={numberOfFrets}
        isEditable={isEditable}
        callBack={notesCallBack}
        notesToShow={notesToShow}
        ignoreOctaves={ignoreOctaves}
        hideOctave={hideOctave}
      />
    );
  }

  let optionTunings = [];
  for (var key in tunings) {
    optionTunings.push(
      <option key={key} value={key}>
        {key}
      </option>
    );
  }

  //console.log("key", tuningKey);

  return (
    <div>
      <div className="settings-neck">
        <fieldset>
          <p>
            <label htmlFor={stringsPreId}>Tuning: </label>
            <select value={tuningKey} onChange={handleTuning} id={stringsPreId}>
              {optionTunings}
            </select>
          </p>
        </fieldset>
        <fieldset>
          <p>
            <label htmlFor={stringsInputId}>Number of strings: </label>
            <input
              type="number"
              value={numberOfStrings}
              onChange={handleStrings}
              id={stringsInputId}
              className="number"
            />
          </p>
        </fieldset>
        {!extendedSettings ? null : (
          <>
            <fieldset>
              <input
                type="checkbox"
                checked={ignoreOctaves}
                onChange={() => settingsCallback("ignoreOctaves", null)}
                name="octv"
                id="octv"
              />
              <label htmlFor="octv">Ignore octaves</label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                checked={hideOctave}
                onChange={() => settingsCallback("hideOctaves", null)}
                name="hideoctv"
                id="hideoctv"
              />
              <label htmlFor="hideoctv">Hide octaves</label>
            </fieldset>
            <fieldset>
              <label htmlFor="frets">Number of frets: </label>
              <input
                type="number"
                value={numberOfFrets}
                onChange={(e) => settingsCallback("frets", e)}
                name="frets"
                id="frets"
                className="number"
              />
            </fieldset>
            <fieldset>
              <button onClick={() => settingsCallback("clearAll", null)}>
                Clear all selected notes
              </button>
            </fieldset>
          </>
        )}
      </div>
      <div className="neck">
        <TString numberOfFrets={numberOfFrets} />
        {strings}
      </div>
    </div>
  );
}

export default Neck;
