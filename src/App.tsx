import './App.css';
import data, { type Person } from './data.js';
import { useEffect, useEffectEvent, useState } from 'react';
import StyledButton from './StyledButton.js';
import ScientistItem from './ScientistItem.js';
import PlayerReg from './PlayerReg.js';
import PlayerBoard from './PlayerBoard.js';
import ApiKeyProvider from './ApiKeyProvider.js';
import StopWatch from './StopWatch.js';
import VideoPlayer from './VideoPlayer.js';
import GreetDialog from './GreetDialog.js';
import ScoreBoard from './ScoreBoard.js';
import { Posts, PostsDecl } from './Posts.js';
import OnlineIndicator from './OnlineIndicator.js';

let effectCount = 0;
export default function App() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  useEffect(() => {
    console.log('App effect: ', effectCount++);
  });

  return (
    <ApiKeyProvider>
      <section>
        <OnlineIndicator />
        <StyledButton onClick={() => setIndex(index + 1)}>(App) Click Me!({index})</StyledButton>

        <div className="two-posts">
          <PostsDecl />
          <Posts />
        </div>

        <StyledButton onClick={() => setPlaying(!playing)}>{playing ? 'Stop' : 'Play'} Video</StyledButton>
        <StyledButton onClick={() => setShowVideo(!showVideo)}>Show Video</StyledButton>

        {showVideo && <VideoPlayer isPlaying={playing} />}
        <GreetDialog />

        <ScoreBoard />

        <StopWatch />
        <PlayerBoard />
        <PlayerReg />
        <h2>Scientist List:</h2>
        <ul>{scientists}</ul>
      </section>
    </ApiKeyProvider>
  );
}

function Scientist({ person }: { person: Person }) {
  const [count, setCount] = useState(0);
  return (
    <li className="sc-item">
      <button onClick={() => setCount(count + 1)}>count({count})</button>
      <ScientistItem person={person} />
    </li>
  );
}
