import "../styles/styles.css";
import ProPic from "/src/images/slim-image.jpg";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="title">About SweetSpot</h1>
      <p>
        Hi! I'm Steven Lim, and I am a music worship leader at my church! I play
        Acoustic Guitar, Bass Guitar, Keyboard, Drums, and the occasional
        Electric Guitar. I created SweetSpot to be a tool that worship leaders
        can use when they serve alongside vocalists who don't play an
        instrument.
      </p>
      <p>
        Oftentimes the challenge is that while these vocalists are talented,
        some are unable to determine what key they should sing a song in, which
        can lead to delayed practice times, strained vocal chords, and
        ultimately a lack of preparation. I believe that music worship isn't
        about the music, but ultimately, the better practiced you are, the less
        you have to worry about the music, and the more you can focus on the
        worship!
      </p>
      <img src={ProPic}></img>
      <p>
        Here's how you can support me! You can support me by emailing any
        thoughts, suggestions, or song requests you'd like to see on this
        program to{" "}
        <a href="mailto:stevenylim17@gmail.com">stevenylim17@gmail.com</a>. You
        can also feel free to contact me if this ends up being helpful for you
        in any way!
      </p>
    </div>
  );
}
