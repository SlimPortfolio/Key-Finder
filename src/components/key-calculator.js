import "../styles/styles.css";
import { useEffect, useState } from "react";
import SearchSelect from "./search-select-results";
import DropdownSelect from "./select-dropdown";
import { data, userData, notes } from "../info";
export default function KeyCalculator() {
  //Dictionary of Keys and Their Values
  let keyDictionary = new Map();
  keyDictionary.set("C", 0);
  keyDictionary.set("C#", 1);
  keyDictionary.set("D", 2);
  keyDictionary.set("D#", 3);
  keyDictionary.set("E", 4);
  keyDictionary.set("F", 5);
  keyDictionary.set("F#", 6);
  keyDictionary.set("G", 7);
  keyDictionary.set("G#", 8);
  keyDictionary.set("A", 9);
  keyDictionary.set("A#", 10);
  keyDictionary.set("B", 11);

  //Dictionary of values and their keys
  let valueDictionary = new Map();
  valueDictionary.set(0, "C");
  valueDictionary.set(1, "C#");
  valueDictionary.set(2, "D");
  valueDictionary.set(3, "D#");
  valueDictionary.set(4, "E");
  valueDictionary.set(5, "F");
  valueDictionary.set(6, "F#");
  valueDictionary.set(7, "G");
  valueDictionary.set(8, "G#");
  valueDictionary.set(9, "A");
  valueDictionary.set(10, "A#");
  valueDictionary.set(11, "B");

  //selected song state observers
  const [selectedSong, setSelectedSong] = useState();
  const [selectedVocalist, setSelectedVocalist] = useState();
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
  };
  const [customToggle, setCustomToggle] = useState(false);
  const handleToggleChange = (value) => {
    setCustomToggle(!customToggle);
    setSelectedVocalist("");
  };
  const [customLow, setCustomLow] = useState();
  const [customHigh, setCustomHigh] = useState();
  const [customName, setCustomName] = useState();
  const handleCustomLow = (event) => {
    setCustomLow(event.target.value);
  };
  const handleCustomHigh = (event) => {
    setCustomHigh(event.target.value);
  };
  const handleCustomName = (event) => {
    setCustomName(event.target.value);
  };

  const customVocalist = {
    name: customName,
    highNote: customHigh,
    lowNote: customLow,
  };

  useEffect(() => {
    console.log("custom name is: " + customName);
    setSelectedVocalist(customVocalist);
  }, [customName, customHigh, customLow]);
  //helper functions
  let quantNote = function (note) {
    let octave = note.charAt(note.length - 1);
    let value =
      octave * 12 +
      keyDictionary.get(note.substring(0, note.length - 1).toString());
    return value;
  };
  let gapNote = function (note1, note2) {
    let result = quantNote(note1) - quantNote(note2);
    return result;
  };
  let isSingable = function (rSong, rVocalist) {
    if (rSong > rVocalist) {
      return false;
    } else {
      return true;
    }
  };
  let highGap = function (highSong, highVocalist) {
    let result = quantNote(highVocalist) - quantNote(highSong);
    return result;
  };

  let keyCalculation = function () {
    let highNoteSong = selectedSong.highNote;
    let lowNoteSong = selectedSong.lowNote;
    let highNoteVocalist = selectedVocalist.highNote;
    let lowNoteVocalist = selectedVocalist.lowNote;
    let rangeSong = gapNote(highNoteSong, lowNoteSong);
    let rangeVocalist = gapNote(highNoteVocalist, lowNoteVocalist);
    let singable = isSingable(rangeSong, rangeVocalist);
    let highCalculation = highGap(highNoteSong, highNoteVocalist);
    if (singable == false) {
      return "Song is Unsingable";
    }
    let rangeTotal = rangeVocalist - rangeSong;
    let newKey =
      keyDictionary.get(selectedSong.originalKey) +
      highCalculation -
      Math.floor(rangeTotal / 2);
    newKey = ((newKey % 12) + 12) % 12;
    return valueDictionary.get(newKey);
  };

  let submitButton = function () {
    if (
      selectedSong &&
      selectedVocalist &&
      selectedSong.songName != undefined &&
      selectedVocalist.name != undefined
    ) {
      document.querySelector("span.solution-text").innerHTML =
        "Recommended Key for " + selectedVocalist.name + " Is: ";
      document
        .querySelector("span.solution")
        .classList.add("solution-background");
      document.querySelector("span.solution").innerHTML = keyCalculation();
      document.querySelector("p.solution-song").innerHTML =
        selectedSong.songName;
    } else {
      document.querySelector("span.solution-text").innerHTML =
        "Please fill out all information for recommended key";
      document.querySelector("span.solution").innerHTML = "";
      document.querySelector("p.solution-song").innerHTML = "";
      document
        .querySelector("span.solution")
        .classList.remove("solution-background");
    }
  };

  //Select a Song DropDown Handler
  let showOptions = function () {
    const dropdown = document.querySelector("div.search-bar-results");
    if (dropdown == null) return;
    dropdown.classList.replace(
      "search-bar-results",
      "search-bar-results-shown"
    );
    setSelectedSong("");
    setInput("");
  };
  window.addEventListener("click", function (e) {
    var dropdown = document.querySelector("div.search-bar-results-shown");
    var input = document.querySelector("input.search-bar");
    if (input === null || dropdown === null) return;
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.replace(
        "search-bar-results-shown",
        "search-bar-results"
      );
    }
  });
  return (
    <div className="calculator-container">
      <h1 className="title">Key Finder</h1>
      <div className="calculator-solution-container">
        <p className="description">
          Please Select a vocalist and a song, then hit the submit button to see
          the recommended key.
        </p>
        <label>Select A Song</label>
        <input
          placeholder="Type to search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="search-bar"
          onClick={showOptions}
        ></input>
        <SearchSelect
          data={data}
          input={input}
          setInput={setInput}
          setSelection={setSelectedSong}
          selection={selectedSong}
        />
        <br></br>
        <label>Select A Vocalist</label>
        <div>
          <span>Custom Vocalist</span>
          <input
            type="checkbox"
            className="custom-vocalist-toggle"
            onChange={handleToggleChange}
          ></input>
        </div>
        {!customToggle ? (
          <DropdownSelect
            data={userData}
            setSelection={setSelectedVocalist}
            inputClass="calculator-dropdown"
          />
        ) : (
          <div>
            <input
              placeholder="Type your name"
              className="custom-name"
              onChange={handleCustomName}
            ></input>
            <select className="custom-range" onChange={handleCustomLow}>
              <option hidden>Low</option>
              {notes.map((note) => (
                <option>{note}</option>
              ))}
            </select>
            <select className="custom-range" onChange={handleCustomHigh}>
              <option hidden>High</option>
              {notes.map((note) => (
                <option>{note}</option>
              ))}
            </select>
            {/* add a component where you could click and drag your range */}
          </div>
        )}
        <br></br>
        <input
          className="submit-button"
          type="submit"
          value="Submit"
          onClick={() => submitButton()}
        ></input>
        <p className="solution-song"></p>
        <div>
          <span className="solution-text"></span>
          <span className="solution"></span>
        </div>
      </div>
    </div>
  );
}
