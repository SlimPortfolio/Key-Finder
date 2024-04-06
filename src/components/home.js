import "../styles/styles.css";
import logo from "../images/SweetSpot Logo.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <img src={logo} alt="sweetspot-logo"></img>
      <p>
        SweetSpot is an app that Christian Worship Leaders can use to recommend
        a suitable key for their vocalist to sing a song in. Check out the app
        by clicking the button below.
      </p>
      <Link to="/Key-Finder/app" className="link-button">
        Key Finder
      </Link>
    </div>
  );
}
