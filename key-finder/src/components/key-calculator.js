export default function KeyCalculator() {
  const data = [
    {
      ID: 1,
      SongName: "Blessed Be Your Name",
      LowNote: "C4",
      HighNote: "G4",
    },
    {
      ID: 2,
      SongName: "Amazing Grace (My Chains Are Gone)",
      LowNote: "C4",
      HighNote: "E5",
    },
    {
      ID: 3,
      SongName: "Hymn of Heaven",
      LowNote: "A3",
      HighNote: "E5",
    },
    {
      ID: 4,
      SongName: "How Great is Our God",
      LowNote: "B3",
      HighNote: "G4",
    },
    {
      ID: 5,
      SongName: "How He Loves",
      LowNote: "C4",
      HighNote: "E5",
    },
  ];

  const userData = [
    {
      Name: "Steven Lim",
    },
  ];

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
  let originalSong = {
    originalKey: "A",
    lowNote: "A3",
    highNote: "C#5",
  };

  let vocalist1 = {
    lowNote: "B3",
    highNote: "E5",
  };

  let keySong = originalSong.originalKey;
  let highNoteSong = originalSong.highNote;
  let lowNoteSong = originalSong.lowNote;
  let highNoteVocalist = vocalist1.highNote;
  let lowNoteVocalist = vocalist1.lowNote;
  let rangeSong = gapNote(highNoteSong, lowNoteSong);
  let rangeVocalist = gapNote(highNoteVocalist, lowNoteVocalist);
  let singable = isSingable(rangeSong, rangeVocalist);
  let highCalculation = highGap(highNoteSong, highNoteVocalist);
  console.log(highNoteSong);

  let keyCalculation = function (singable, highCalculation, originalKey) {
    if (singable == false) {
      return "Song is Unsingable";
    }
    let newKey = keyDictionary.get(originalKey) + highCalculation;
    console.log("newk is", newKey);
    newKey = ((newKey % 12) + 12) % 12;
    return "New Value is Key of " + valueDictionary.get(newKey);
  };

  console.log(keyCalculation(singable, highCalculation, keySong));
  return (
    <div>
      <h1>Ideal Vocal Key Calculator</h1>
      <p>Range of the Original Song is {rangeSong}</p>
      <p>Range of the Vocalist is {rangeVocalist}</p>
    </div>
  );
}
