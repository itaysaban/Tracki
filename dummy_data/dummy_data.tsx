

const openCases = [
  { id: '1', name: 'Sarah Cohen', lastSeen: 'Tel Aviv', image: require('../assets/images/missing profiles/kid 3.jpeg')},
  { id: '2', name: 'David Levi', lastSeen: 'Haifa', image: require('../assets/images/missing profiles/Kid 1.jpeg')},
  { id: '3', name: 'Nora Barak', lastSeen: 'Jerusalem', image: require('../assets/images/missing profiles/kid 2.jpeg') },
];


const closedCases = [
 { id: '4', name: 'Itay Saban', lastSeen: 'Tel Aviv' ,image: require('../assets/images/missing profiles/kid 4.png')}
]

// dummy_data/dummy_data.tsx

export const dummyCases = [
  {
    id: '1',
    name: 'Sarah Cohen',
    age: 10,
    gender: 'Female',
    skinColor: 'Light',
    eyeColor: 'Green',
    hairColor: 'Brown',
    height: "130 cm",
    weight: "30 kg",
    clothing: 'Yellow dress and white sandals',
    lastSeen: 'Tel Aviv',
    dateMissing: '2025-06-20',
    image: require('../assets/images/missing profiles/kid 3.jpeg'),
    status: "open"
  },
  {
    id: '2',
    name: 'David Levi',
    age: 12,
    gender: 'Male',
    skinColor: 'Medium',
    eyeColor: 'Brown',
    hairColor: 'Black',
    height: "140 cm",
    weight: "35 kg",
    clothing: 'Red hoodie and black jeans',
    lastSeen: 'Haifa',
    dateMissing: '2025-06-18',
    image: require('../assets/images/missing profiles/Kid 1.jpeg'),
    status: "open"
  },
  {
    id: '3',
    name: 'Nora Barak',
    age: 8,
    gender: 'Female',
    skinColor: 'Light',
    eyeColor: 'Blue',
    hairColor: 'Blonde',
    height: "125 cm",
    weight: "28 kg",
    clothing: 'Blue T-shirt with stars and gray shorts',
    lastSeen: 'Jerusalem',
    dateMissing: '2025-06-25',
    image: require('../assets/images/missing profiles/kid 2.jpeg'),
    status: "open"
  },
  {
    id: '4',
    name: 'Itay Saban',
    age: 23,
    gender: 'Male',
    skinColor: 'Brownish',
    eyeColor: 'Green',
    hairColor: 'Brown',
    height: "185 cm",
    weight: "100 kg",
    clothing: 'Yellow dress and white sandals',
    lastSeen: 'Tel Aviv',
    dateMissing: '2025-06-20',
    image: require('../assets/images/missing profiles/kid 4.png'),
    status: "closed"
  }
];


export default {openCases, closedCases, dummyCases};
