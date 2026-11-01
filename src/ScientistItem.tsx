import { type Person, getImageUrl } from './data.js';

export default function ScientistItem({ person }: { person: Person }) {
  return (
    <>
      <img className="sc-img" src={getImageUrl(person)} alt="" />
      <div className="sc-desc">
        <h4>{person.name}</h4>
        <p>
          Profession: {person.profession}, known for <span>{person.accomplishment}</span>
        </p>
      </div>
    </>
  );
}
