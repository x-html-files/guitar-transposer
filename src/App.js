import "./App.css";
import Neck from "./components/Neck";
import { useState } from "react";
import { tunings } from "./data/tunings";

function App() {
  const defaultSettings = {
    numberOfFrets: 12,
    maxNumberOfFrets: 24,
    hideOctaves: false,
    ignoreOctaves: false,
    notesToShow: [],
  };

  const [notesToShow, setNotesToShow] = useState(defaultSettings.notesToShow);
  const [numberOfFrets, setNumberOfFrets] = useState(
    defaultSettings.numberOfFrets
  );
  const [ignoreOctaves, setIgnoreOctaves] = useState(
    defaultSettings.ignoreOctaves
  );

  const [hideOctaves, setHideOctaves] = useState(defaultSettings.hideOctaves);

  const stringSettings1 = "Standard 6-string guitar";

  const stringSettings2 = "King Gizzard C# tuning";

  const isEditable = true;

  function notesCallBack(note, remove) {
    if (remove) {
      //console.log("unfiltered", notesToShow);
      //console.log("to delete", note);

      var filtered = notesToShow.filter(
        (p) => p.number != note.number || p.octave != p.octave
      );
      //console.log("filtered", filtered);
      setNotesToShow(filtered);
    } else {
      setNotesToShow([...notesToShow, note]);
    }
  }

  const settingsCallback = (setting, e) => {
    if (setting === "clearAll") {
      handleClearAll();
      return;
    }

    if (setting === "ignoreOctaves") {
      handleIgnoreOctaves();
      return;
    }

    if (setting === "hideOctaves") {
      handleHideOctaves();
      return;
    }

    if (setting === "frets") {
      handleFrets(e);
      return;
    }
  };

  const handleClearAll = () => {
    setNotesToShow([]);
  };

  const handleIgnoreOctaves = () => {
    setIgnoreOctaves(!ignoreOctaves);
  };

  const handleHideOctaves = () => {
    setHideOctaves(!hideOctaves);
  };

  const handleFrets = (e) => {
    let val = e.target.value;

    if (val < 1 || val > defaultSettings.maxNumberOfFrets) {
      val = defaultSettings.numberOfFrets;
    }
    //console.log("number of frets", val);

    setNumberOfFrets(val);
  };

  return (
    <div className="App">
      <h1>Guitar Transposer</h1>
      <div className="container">
        {/* <div className="settings-main">
          <fieldset>
            <input
              type="checkbox"
              checked={ignoreOctaves}
              onChange={handleIgnoreOctaves}
              name="octv"
              id="octv"
            />
            <label htmlFor="octv">Ignore octaves</label>
          </fieldset>
          <fieldset>
            <input
              type="checkbox"
              checked={hideOctaves}
              onChange={handleHideOctaves}
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
              onChange={handleFrets}
              name="frets"
              id="frets"
              className="number"
            />
          </fieldset>
          <fieldset>
            <button onClick={handleClearAll}>Clear all selected notes</button>
          </fieldset>
        </div> */}

        <Neck
          key="neck1"
          tuning={stringSettings1}
          numberOfFrets={numberOfFrets}
          isEditable={true}
          notesCallBack={notesCallBack}
          notesToShow={notesToShow}
          ignoreOctaves={ignoreOctaves}
          hideOctave={hideOctaves}
          extendedSettings={true}
          settingsCallback={settingsCallback}
        />
        <Neck
          key="neck2"
          tuning={stringSettings2}
          numberOfFrets={numberOfFrets}
          isEditable={true}
          notesToShow={notesToShow}
          notesCallBack={notesCallBack}
          ignoreOctaves={ignoreOctaves}
          hideOctave={hideOctaves}
        />
      </div>
    </div>
  );
}

export default App;
