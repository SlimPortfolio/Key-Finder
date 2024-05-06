export default function CustomVocalist(props) {
  return (
    <div>
      <input
        placeholder="Type your name"
        className="custom-name"
        onChange={props.handleName}
      ></input>
      <select className="custom-range" onChange={props.handleLow}>
        <option hidden>Low</option>
        {props.notes.map((note) => (
          <option>{note}</option>
        ))}
      </select>
      <select className="custom-range" onChange={props.handleHigh}>
        <option hidden>High</option>
        {props.notes.map((note) => (
          <option>{note}</option>
        ))}
      </select>
      {/* add a component where you could click and drag your range */}
    </div>
  );
}
