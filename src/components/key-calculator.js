import "../styles/styles.css";
import { useState } from "react";

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
    // return Math.abs(result);
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
    let originalKey = selectedSong.originalKey;
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
    let newKey = keyDictionary.get(selectedSong.originalKey) + highCalculation;
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
        "Recommended Key Is: ";
      document.querySelector("span.solution").innerHTML = keyCalculation();
      document.querySelector("p.solution-song").innerHTML =
        selectedSong.songName;
    } else {
      document.querySelector("span.solution-text").innerHTML =
        "Please fill out all information for recommended key";
    }
  };
  return (
    <div className="calculator-container">
      <h1>Ideal Vocal Key Calculator</h1>
      <p>
        Please Select a vocalist and a song, then hit the submit button to see
        the recommended key.
      </p>

      <div className="calculator-solution-container">
        <select
          className="calculator-dropdown"
          id="songName"
          onChange={(e) => {
            const c = data?.find((x) => {
              if (x.id == undefined) return null;
              else if (x.id == e.target.value) {
                console.log(x);
                console.log(e.target);
                setSelectedSong(x);
              }
            });
          }}
        >
          <option>Select Your Song</option>
          {data.map((song) => (
            <option key={song.id} value={song.id}>
              {song.songName}
            </option>
          ))}
        </select>
        <br></br>
        <select
          className="calculator-dropdown"
          id="vocalistName"
          onChange={(e) => {
            const c = userData?.find((x) => {
              if (x.id == undefined) return null;
              else if (x.id == e.target.value) {
                console.log(x);
                setSelectedVocalist(x);
              }
            });
          }}
        >
          <option>Select Your Vocalist</option>
          {userData.map((vocalist) => (
            <option key={vocalist.id} value={vocalist.id}>
              {vocalist.name}
            </option>
          ))}
        </select>
        <br></br>
        <input
          type="submit"
          value="Submit"
          onClick={() => submitButton()}
        ></input>
        <p className="solution-song"></p>
        <span className="solution-text"></span>
        <span className="solution"></span>
      </div>
    </div>
  );
}
