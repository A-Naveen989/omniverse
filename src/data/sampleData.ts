
export type Title = {
  id: string;
  name: string;
  type: "Movie" | "Series" | "Anime";
  year: number;
  country: string;
  rating: string;
  genre: string[];
  description: string;
  poster: string;
  backdrop: string;
};

export type Character = {
  id: string;
  name: string;
  title: string;
  role: string;
  power: string;
  description: string;
  image: string;
};

export const titles: Title[] = [
  {
    id: "demon-slayer",
    name: "Demon Slayer",
    type: "Anime",
    year: 2019,
    country: "Japan",
    rating: "8.6",
    genre: ["Action", "Fantasy"],
    description:
      "Tanjiro Kamado joins the Demon Slayer Corps after his family is slaughtered and his sister becomes a demon.",
    poster:
      "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/2qAq4eJ7M8J0bQ8K5uZ6Q8m9m0N.jpg",
  },
  {
    id: "jujutsu-kaisen",
    name: "Jujutsu Kaisen",
    type: "Anime",
    year: 2020,
    country: "Japan",
    rating: "8.5",
    genre: ["Action", "Supernatural"],
    description:
      "Yuji Itadori enters the world of cursed spirits after consuming a powerful cursed object.",
    poster:
      "https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqawuQdH0H0.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/7G4fQ8Q7w8Q8k8n8j8j8j8j8j8.jpg",
  },
  {
    id: "the-dark-knight",
    name: "The Dark Knight",
    type: "Movie",
    year: 2008,
    country: "USA",
    rating: "9.0",
    genre: ["Action", "Crime"],
    description:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos.",
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UnCNzcqUt7B0r4.jpg",
  },
  {
    id: "breaking-bad",
    name: "Breaking Bad",
    type: "Series",
    year: 2008,
    country: "USA",
    rating: "9.5",
    genre: ["Crime", "Drama"],
    description:
      "A chemistry teacher turns to manufacturing drugs after receiving a terminal diagnosis.",
    poster:
      "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/eSzpyv4rDxZ2H2g2H2g2H2g2H2.jpg",
  },
  {
    id: "avengers-endgame",
    name: "Avengers: Endgame",
    type: "Movie",
    year: 2019,
    country: "USA",
    rating: "8.4",
    genre: ["Action", "Sci-Fi"],
    description:
      "The Avengers assemble once more to reverse the devastating actions of Thanos.",
    poster:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  },
  {
    id: "attack-on-titan",
    name: "Attack on Titan",
    type: "Anime",
    year: 2013,
    country: "Japan",
    rating: "9.1",
    genre: ["Action", "Drama"],
    description:
      "Humanity fights for survival against gigantic humanoid Titans.",
    poster:
      "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/aiy3V4j2J5v1Q5j5j5j5j5j5j5.jpg",
  },
];

export const characters: Character[] = [
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    title: "Demon Slayer",
    role: "Main Protagonist",
    power: "Water Breathing / Hinokami Kagura",
    description:
      "A compassionate demon slayer who fights to protect humanity and save his sister Nezuko.",
    image:
      "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/9e/Tanjiro_anime.png",
  },
  {
    id: "gojo",
    name: "Satoru Gojo",
    title: "Jujutsu Kaisen",
    role: "Special Grade Sorcerer",
    power: "Limitless / Six Eyes",
    description:
      "A powerful jujutsu sorcerer known for his overwhelming abilities and confident personality.",
    image:
      "https://static.wikia.nocookie.net/jujutsu-kaisen/images/0/0a/Satoru_Gojo.png",
  },
  {
    id: "eren",
    name: "Eren Yeager",
    title: "Attack on Titan",
    role: "Main Protagonist",
    power: "Attack Titan / Founding Titan",
    description:
      "A determined character whose pursuit of freedom changes the fate of the world.",
    image:
      "https://static.wikia.nocookie.net/shingekinokyojin/images/7/7a/Eren_Yeager.png",
  },
  {
    id: "batman",
    name: "Batman",
    title: "The Dark Knight",
    role: "Superhero",
    power: "Detective Skills / Gadgets",
    description:
      "A highly skilled detective and vigilante who protects Gotham City.",
    image:
      "https://static.wikia.nocookie.net/batman/images/8/8a/Batman.png",
  },
];

export const powers = [
  {
    id: "limitless",
    name: "Limitless",
    user: "Satoru Gojo",
    title: "Jujutsu Kaisen",
    category: "Cursed Technique",
    description:
      "Manipulates space at an atomic level, allowing techniques such as Infinity, Blue, Red, and Hollow Purple.",
  },
  {
    id: "sun-breathing",
    name: "Sun Breathing",
    user: "Tanjiro Kamado",
    title: "Demon Slayer",
    category: "Breathing Style",
    description:
      "A powerful swordsmanship breathing style that serves as the origin of other breathing styles.",
  },
  {
    id: "attack-titan",
    name: "Attack Titan",
    user: "Eren Yeager",
    title: "Attack on Titan",
    category: "Titan Power",
    description:
      "A Titan power associated with the pursuit of freedom and memories across inheritors.",
  },
  {
    id: "super-strength",
    name: "Super Strength",
    user: "Superman",
    title: "DC Universe",
    category: "Superpower",
    description:
      "Superhuman strength capable of extraordinary feats.",
  },
];

export const weapons = [
  {
    id: "nichirin-sword",
    name: "Nichirin Sword",
    user: "Tanjiro Kamado",
    title: "Demon Slayer",
    category: "Sword",
    description:
      "A special sword forged from materials that absorb sunlight and are used by Demon Slayers.",
  },
  {
    id: "infinity-gauntlet",
    name: "Infinity Gauntlet",
    user: "Thanos",
    title: "Marvel Universe",
    category: "Artifact",
    description:
      "A powerful gauntlet designed to hold the six Infinity Stones.",
  },
  {
    id: "batarang",
    name: "Batarang",
    user: "Batman",
    title: "DC Universe",
    category: "Gadget",
    description:
      "A bat-shaped throwing weapon used for combat, distraction, and utility.",
  },
  {
    id: "zanpakuto",
    name: "Zanpakuto",
    user: "Ichigo Kurosaki",
    title: "Bleach",
    category: "Sword",
    description:
      "A Soul Reaper's weapon that reflects the wielder's spirit and abilities.",
  },
];
