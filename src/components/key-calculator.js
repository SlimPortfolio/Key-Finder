import "../styles/styles.css";
import { useEffect, useState } from "react";
import SearchSelect from "./search-select-results";
import DropdownSelect from "./select-dropdown";
import CustomVocalist from "./custom-vocalist";
import { data, userData, notes, keyDictionary, valueDictionary } from "../info";
export default function KeyCalculator() {
  //selected song state observers
  const [selectedSong, setSelectedSong] = useState();
  const [selectedVocalist, setSelectedVocalist] = useState();
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
  };

  //handling custom inputs
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
  //custom vocalist object
  const customVocalist = {
    name: customName,
    highNote: customHigh,
    lowNote: customLow,
  };
  //updating custom vocalist state
  useEffect(() => {
    console.log("custom name is: " + customName);
    setSelectedVocalist(customVocalist);
  }, [customName, customHigh, customLow]);

  //helper functions for key calculation
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

  //if the song is not singable, it will return as such, otherwise it will calculate the excess range of the singer compared to the song
  //then calculate a new key and make a small adjustment to it sits near the middle
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

  //on submit, if all fields have been filled in, result will be shown. CSS classes are toggled to show/hide sections.
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
  //hide search bar results if user clicks away from the box
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
          <CustomVocalist
            handleName={handleCustomName}
            handleLow={handleCustomLow}
            handleHigh={handleCustomHigh}
            notes={notes}
          />
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
