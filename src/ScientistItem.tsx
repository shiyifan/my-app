import { useState } from 'react';
import { type Person, getImageUrl } from './data.js';
import StyledButton from './StyledButton.js';
import SayHello from './SayHello';

export default function ScientistItem({ person }: { person: Person }) {
  const [voteCount, setVoteCount] = useState(0);
  return (
    <>
      <img className="sc-img" src={getImageUrl(person)} alt="" />
      <div className="sc-desc">
        <h4>{person.name}</h4>
        <p>
          Profession: {person.profession}, known for <span>{person.accomplishment}</span>
        </p>
        <StyledButton onClick={() => setVoteCount(voteCount + 1)}>Vote({voteCount})</StyledButton>
      </div>
      <SayHello person={person} />
    </>
  );
}
