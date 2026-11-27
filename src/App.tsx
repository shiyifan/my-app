import './App.css';
import data, { type Person } from './data.js';
import { Suspense, useCallback, useState } from 'react';
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
import FancyWrapper from './FancyWrapper.js';
import Movies from './Movies.js';
import OrderCalc from './OrderCalc.js';
import TooltipButton from './TooltipButton.js';
import AlbumLoader from './Albums.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  const onlineHandler = useCallback(() => {
    console.log('online changed');
  }, []);

  return (
    <ApiKeyProvider>
      <section>
        <OnlineIndicator onOnlineChanged={onlineHandler} />
        <StyledButton onClick={() => setIndex(index + 1)}>(App) Click Me!({index})</StyledButton>

        <FancyWrapper>
          <OrderCalc></OrderCalc>
        </FancyWrapper>

        <TooltipButton style={{ fontSize: '1.2rem' }} tooltip={<h4>Hello Tooltip!</h4>}>
          Tooltip Button
        </TooltipButton>

        <AlbumLoader></AlbumLoader>

        <FancyWrapper>
          <div className="two-posts">
            <PostsDecl />
            <Posts />
          </div>
        </FancyWrapper>

        <FancyWrapper>
          <Movies />
        </FancyWrapper>

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
