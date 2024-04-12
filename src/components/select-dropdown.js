import "../styles/styles.css";
export default function DropdownSelect(props) {
  //this component allows a user to pass through a list of data, and allows a selection function to be passed back
  return (
    <select
      className={props.inputClass}
      id="vocalistName"
      onChange={(e) => {
        const c = props.data?.find((x) => {
          if (x.id == undefined) return null;
          else if (x.id == e.target.value) {
            props.setSelection(x);
          }
        });
      }}
    >
      <option>Select Your Vocalist</option>
      {props.data
        .sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        .map((vocalist) => (
          <option key={vocalist.id} value={vocalist.id}>
            {vocalist.name}
          </option>
        ))}
    </select>
  );
}
