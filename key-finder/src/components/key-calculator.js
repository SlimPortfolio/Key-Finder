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

  const keyDictionary = new Map();
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

  const valueDictionary = new Map();
  keyDictionary.set(0, "C");
  keyDictionary.set(1, "C#");
  keyDictionary.set(2, "D");
  keyDictionary.set(3, "D#");
  keyDictionary.set(4, "E");
  keyDictionary.set(5, "F");
  keyDictionary.set(6, "F#");
  keyDictionary.set(7, "G");
  keyDictionary.set(8, "G#");
  keyDictionary.set(9, "A");
  keyDictionary.set(10, "A#");
  keyDictionary.set(11, "B");

  const quantNote = function (note) {
    const octave = note.charAt(note.length - 1);
    const value =
      octave * 12 +
      keyDictionary.get(note.substring(0, note.length - 1).toString());
    return value;
  };
  const gapNote = function (note1, note2) {
    const result = quantNote(note1) - quantNote(note2);
    // return Math.abs(result);
    return result;
  };

  const originalSong = {
    originalKey: "C",
    lowNote: "E4",
    highNote: "F5",
  };

  const vocalist1 = {
    lowNote: "B3",
    highNote: "E5",
  };

  const highNoteSong = originalSong.highNote;
  const lowNoteSong = originalSong.lowNote;
  const highNoteVocalist = vocalist1.highNote;
  const lowNoteVocalist = vocalist1.lowNote;
  const rangeSong = gapNote(highNoteSong, lowNoteSong);
  const rangeVocalist = gapNote(highNoteVocalist, lowNoteVocalist);

  const isSingable = function (rSong, rVocalist) {
    if (rSong > rVocalist) {
      return false;
    } else {
      return true;
    }
  };

  const highGap = function (highSong, highVocalist) {
    const result = quantNote(note1) - quantNote(note2);
  };
  return (
    <div>
      <h1>Ideal Vocal Key Calculator</h1>
      <p>Range of the Original Song is {rangeSong}</p>
      <p>Range of the Vocalist is {rangeVocalist}</p>
      <p>Song is Singable: {isSingable(rangeSong, rangeVocalist)}</p>
    </div>
  );
}
