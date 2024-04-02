import "../styles/styles.css";
export default function SearchSelect(props) {
  //this component will display data that is passed in through props, and upon selection, allows a variable to be set.
  return (
    <div className="search-bar-results-container">
      <div className="search-bar-results">
        {props.data
          .sort(function (a, b) {
            if (a.songName < b.songName) {
              return -1;
            }
            if (a.songName > b.songName) {
              return 1;
            }
            return 0;
          })
          .filter((item) => {
            const searchTerm = props.input.toLowerCase();
            const fullName = item.songName.toLowerCase();
            const check = fullName.search(searchTerm);
            if (check === -1) {
              return false;
            } else {
              return true && fullName !== searchTerm;
            }
          })
          .map((item) => (
            <div
              onClick={(e) => {
                props.setInput(item.songName);
                const targetId = e.target.getAttribute("value");
                props.data.find((x) => {
                  if (x.id == undefined) {
                    return null;
                  } else if (x.id == targetId) {
                    props.setSelection(x);
                  }
                });
              }}
              key={item.id}
              value={item.id}
              className="search-bar-item"
            >
              {item.songName}
            </div>
          ))}
      </div>
    </div>
  );
}
