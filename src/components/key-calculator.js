import "../styles/styles.css";
import { useState } from "react";
import SearchSelect from "./search-select-results";
import DropdownSelect from "./select-dropdown";

export default function KeyCalculator() {
  //Song Data
  const data = [
    {
      id: 1,
      songName: "Blessed Be Your Name",
      lowNote: "A#3",
      highNote: "C#5",
      originalKey: "G#",
    },
    {
      id: 2,
      songName: "Amazing Grace (My Chains Are Gone)",
      lowNote: "D4",
      highNote: "G5",
      originalKey: "G",
    },
    {
      id: 3,
      songName: "God, You're So Good",
      lowNote: "G4",
      highNote: "C6",
      originalKey: "G",
    },
    {
      id: 4,
      songName: "Hymn of Heaven",
      lowNote: "D4",
      highNote: "G5",
      originalKey: "D",
    },
    {
      id: 5,
      songName: "How He Loves",
      lowNote: "C4",
      highNote: "F5",
      originalKey: "C",
    },
    {
      id: 6,
      songName: "Glorious Day",
      lowNote: "D3",
      highNote: "F#4",
      originalKey: "D",
    },
    {
      id: 7,
      songName: "Happy Day",
      lowNote: "C3",
      highNote: "E4",
      originalKey: "C",
    },
    {
      id: 8,
      songName: "Praise the King",
      lowNote: "C3",
      highNote: "F4",
      originalKey: "C",
    },
    {
      id: 9,
      songName: "Living Hope",
      lowNote: "D#3",
      highNote: "G4",
      originalKey: "D#",
    },
    {
      id: 10,
      songName: "Because He Lives",
      lowNote: "B2",
      highNote: "F#4",
      originalKey: "A",
    },
    {
      id: 11,
      songName: "Forever",
      lowNote: "G3",
      highNote: "C5",
      originalKey: "G",
    },
  ];
  //Vocalist Data
  const userData = [
    {
      id: 1,
      name: "Steven Lim",
      highNote: "E5",
      lowNote: "A3",
    },
    {
      id: 2,
      name: "David Shiu",
      highNote: "C#5",
      lowNote: "F3",
    },
    {
      id: 3,
      name: "Johnny Wang",
      highNote: "E5",
      lowNote: "F3",
    },
    {
      id: 4,
      name: "Jeremy Lim",
      highNote: "E5",
      lowNote: "G3",
    },
    {
      id: 5,
      name: "David Jante",
      highNote: "E5",
      lowNote: "B3",
    },
  ];

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
        />
        <br></br>
        <label>Select A Vocalist</label>
        <DropdownSelect data={userData} setSelection={setSelectedVocalist} />
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
