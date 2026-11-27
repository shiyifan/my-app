const people = [
  {
    id: 0, // Used in JSX as a key
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageId: 'MK3eW3A',
  },
  {
    id: 1, // Used in JSX as a key
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageId: 'mynHUSa',
  },
  // {
  //   id: 2, // Used in JSX as a key
  //   name: 'Mohammad Abdus Salam',
  //   profession: 'physicist',
  //   accomplishment: 'electromagnetism theory',
  //   imageId: 'bE7W1ji',
  // },
  // {
  //   id: 3, // Used in JSX as a key
  //   name: 'Percy Lavon Julian',
  //   profession: 'chemist',
  //   accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  //   imageId: 'IOjWm71',
  // },
  // {
  //   id: 4, // Used in JSX as a key
  //   name: 'Subrahmanyan Chandrasekhar',
  //   profession: 'astrophysicist',
  //   accomplishment: 'white dwarf star mass calculations',
  //   imageId: 'lrWQx8l',
  // },
];

export default people;

export interface Person {
  id: number;
  name: string;
  profession: string;
  accomplishment: string;
  imageId: string;
}

export function getImageUrl(person: { imageId: string }) {
  return 'https://react.dev/images/docs/scientists/' + person.imageId + 's.jpg';
}

export const scores = [
  { id: 3, category: 'list' as const, score: 38 },
  { id: 32, category: 'graph' as const, score: 13 },
  { id: 7, category: 'tree' as const, score: 72 },
  { id: 8, category: 'tree' as const, score: 60 },
];

export const books = [
  { name: 'A Tale Of Two Cities', author: 'Dickens' },
  { name: 'The Call Of Cthulhu', author: 'Lovecraft' },
  { name: 'Izu No Odoriko', author: 'Kawabata Yasunari' },
  { name: 'Bailuyuan', author: 'Chen Zhongshi' },
  { name: 'Love Of Life', author: 'Jack London' },
];

export const beatlesAlbums: Album[] = [
  {
    id: 13,
    title: 'Let It Be',
    year: 1970,
  },
  {
    id: 12,
    title: 'Abbey Road',
    year: 1969,
  },
  {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969,
  },
  {
    id: 10,
    title: 'The Beatles',
    year: 1968,
  },
  {
    id: 9,
    title: 'Magical Mystery Tour',
    year: 1967,
  },
  {
    id: 8,
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    year: 1967,
  },
  {
    id: 7,
    title: 'Revolver',
    year: 1966,
  },
  {
    id: 6,
    title: 'Rubber Soul',
    year: 1965,
  },
  {
    id: 5,
    title: 'Help!',
    year: 1965,
  },
  {
    id: 4,
    title: 'Beatles For Sale',
    year: 1964,
  },
  {
    id: 3,
    title: "A Hard Day's Night",
    year: 1964,
  },
  {
    id: 2,
    title: 'With The Beatles',
    year: 1963,
  },
  {
    id: 1,
    title: 'Please Please Me',
    year: 1963,
  },
];

export interface Album {
  id: number;
  title: string;
  year: number;
}
