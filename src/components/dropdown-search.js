import { useState } from "react";
import "../styles/styles.css";
export default function Search() {
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
      highNote: "",
      lowNote: "",
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

  const [input, setInput] = useState("");
  //   const dataSort = data.filter((user) => {
  //     return (
  //       user.id &&
  //       user.songName &&
  //       user.lowNote &&
  //       user.highNote &&
  //       user.originalKey
  //     );
  //   });

  const newData = data.filter((user) => {
    return (
      user.id &&
      user.songName &&
      user.lowNote &&
      user.highNote &&
      user.originalKey
    );
  });

  const handleChange = (value) => {
    setInput(value);
  };
  return (
    <div>
      <h1>Dropdown Search</h1>
      {/* <label>Choose Your Song</label>
      <select
        id="songName"
        onChange={(e) => {
          const c = data?.find((x) => {
            if (x.id == undefined) return null;
            else if (x.id == e.target.value) {
              console.log(x);
              console.log(e.target);
              //   setSelectedSong(x);
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
      <label>Choose Your Vocalist</label>
      <select
        id="vocalistName"
        onChange={(e) => {
          const c = userData?.find((x) => {
            if (x.id == undefined) return null;
            else if (x.id == e.target.value) {
              console.log(x);
              //   setSelectedVocalist(x);
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
      <br></br> */}
      <input
        placeholder="Type to search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="search-bar"
      ></input>
      <div className="search-bar-results">
        {data
          .filter((item) => {
            const searchTerm = input.toLowerCase();
            const fullName = item.songName.toLowerCase();
            const check = fullName.search(searchTerm);
            if (check === -1) {
              return false;
            } else {
              return true;
            }
          })
          .map((item) => (
            <div> {item.songName}</div>
          ))}
      </div>

      <p className="solution"></p>
    </div>
  );
}
