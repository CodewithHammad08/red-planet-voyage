import olympusImg from "@/assets/dest-olympus.jpg";
import vallesImg from "@/assets/dest-valles.jpg";
import jezeroImg from "@/assets/dest-jezero.jpg";
import hellasImg from "@/assets/dest-hellas.jpg";
import phobosImg from "@/assets/dest-phobos.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  summary: string;
  image: string;
  coords: { x: number; y: number }; // % on the map
  fromPrice: number; // credits
  sols: string;
  highlights: string[];
  safety: string;
  accessibility: string[];
};

export const destinations: Destination[] = [
  {
    slug: "olympus-mons-base",
    name: "Olympus Mons Base",
    region: "Tharsis",
    tagline: "The tallest mountain in the solar system.",
    summary:
      "Ride the summit tram 21 km up the shield volcano, walk the caldera rim at sunrise, and sleep at the Skyline habitat above the dust line.",
    image: olympusImg,
    coords: { x: 32, y: 42 },
    fromPrice: 42000,
    sols: "3 sols",
    highlights: ["Summit tram", "Caldera walk", "Skyline habitat", "Low-g observatory"],
    safety: "Pressurised suits required above tram station 4. Radiation shelter along all routes.",
    accessibility: ["Low-g mobility available", "Audio-described tours", "Step-free tram cabins"],
  },
  {
    slug: "valles-marineris-rim",
    name: "Valles Marineris Rim",
    region: "Equatorial",
    tagline: "A canyon that would swallow a continent.",
    summary:
      "Glide the 4,000 km scar of Mars on a canyon flyer, or walk the guided overlooks at Coprates Ridge.",
    image: vallesImg,
    coords: { x: 52, y: 55 },
    fromPrice: 28000,
    sols: "2 sols",
    highlights: ["Canyon flyer", "Coprates overlooks", "Sunset drone tour"],
    safety: "Wind shear advisories during Ls 240–320. Overlooks close at gust > 90 km/h.",
    accessibility: ["Seated flyer cabin", "Live captions on tours"],
  },
  {
    slug: "jezero-heritage-park",
    name: "Jezero Heritage Park",
    region: "Isidis",
    tagline: "Where Perseverance touched down.",
    summary:
      "The 2021 landing site, preserved as a UNESCO-M heritage park. Delta walk, sample cache viewing, and the Rover Museum.",
    image: jezeroImg,
    coords: { x: 70, y: 46 },
    fromPrice: 18000,
    sols: "1 sol",
    highlights: ["Rover Museum", "Delta walk", "Sample cache overlook"],
    safety: "Heritage protection: stay on marked pathways. No unauthorised drone use.",
    accessibility: ["Fully step-free", "Sensory-quiet hours daily 08:00–10:00"],
  },
  {
    slug: "hellas-basin-resorts",
    name: "Hellas Basin Resorts",
    region: "Southern Highlands",
    tagline: "Highest air pressure on Mars.",
    summary:
      "The impact basin sits 7 km below datum — the closest thing to breathable air on the planet. Home to the flagship space hotels.",
    image: hellasImg,
    coords: { x: 60, y: 72 },
    fromPrice: 56000,
    sols: "4 sols",
    highlights: ["Hellas Grand Hotel", "Low-g spa", "Dome gardens", "Night-sky terrace"],
    safety: "Warmest region on Mars but still non-breathable. Suits required outside dome.",
    accessibility: ["Full low-g suite options", "In-room medical support"],
  },
  {
    slug: "phobos-orbital",
    name: "Phobos Orbital Stop",
    region: "Mars orbit",
    tagline: "Fall around Mars three times a day.",
    summary:
      "A 6-hour docked stay at the Phobos Loop Station with EVA windows and a full Mars-rise viewing.",
    image: phobosImg,
    coords: { x: 88, y: 20 },
    fromPrice: 72000,
    sols: "1 sol",
    highlights: ["EVA window", "Mars-rise deck", "Stickney crater flyby"],
    safety: "Certified EVA training required 30 days pre-departure. Radiation dosage logged.",
    accessibility: ["Zero-g mobility assist", "Alternative viewing lounge (no EVA)"],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
