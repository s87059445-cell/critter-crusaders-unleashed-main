// Insect identification and story generation service
export interface InsectInfo {
  name: string;
  scientificName: string;
  characteristics: string[];
  habitat: string;
  behavior: string;
  emoji: string;
}

export interface EnhancedStoryData {
  id: string;
  heroName: string;
  insectType: string;
  origin: string;
  powers: string[];
  weakness: string;
  nemesis: string;
  imageUrl?: string;
  author: string;
  likes: number;
  comments: number;
  timestamp: Date;
  narrationText: string;
}

// Mock insect database - in a real app, this would come from an AI service
const INSECT_DATABASE: Record<string, InsectInfo> = {
  'ant': {
    name: 'Ant',
    scientificName: 'Formicidae',
    characteristics: ['Social insects', 'Strong workers', 'Colony-based'],
    habitat: 'Underground colonies',
    behavior: 'Highly organized and cooperative',
    emoji: '🐜'
  },
  'bee': {
    name: 'Bee',
    scientificName: 'Apidae',
    characteristics: ['Pollinators', 'Honey makers', 'Flying insects'],
    habitat: 'Hives and flowers',
    behavior: 'Busy and productive',
    emoji: '🐝'
  },
  'butterfly': {
    name: 'Butterfly',
    scientificName: 'Lepidoptera',
    characteristics: ['Colorful wings', 'Metamorphosis', 'Graceful flyers'],
    habitat: 'Gardens and meadows',
    behavior: 'Gentle and beautiful',
    emoji: '🦋'
  },
  'ladybug': {
    name: 'Ladybug',
    scientificName: 'Coccinellidae',
    characteristics: ['Spotted wings', 'Beneficial predators', 'Good luck symbols'],
    habitat: 'Plants and gardens',
    behavior: 'Helpful and friendly',
    emoji: '🐞'
  },
  'dragonfly': {
    name: 'Dragonfly',
    scientificName: 'Odonata',
    characteristics: ['Large eyes', 'Fast flyers', 'Ancient insects'],
    habitat: 'Near water bodies',
    behavior: 'Swift and agile',
    emoji: '🦗'
  },
  'spider': {
    name: 'Spider',
    scientificName: 'Arachnida',
    characteristics: ['Eight legs', 'Web spinners', 'Predators'],
    habitat: 'Webs and corners',
    behavior: 'Patient and strategic',
    emoji: '🕷️'
  },
  'grasshopper': {
    name: 'Grasshopper',
    scientificName: 'Orthoptera',
    characteristics: ['Jumping legs', 'Chirping sounds', 'Green color'],
    habitat: 'Grasslands and fields',
    behavior: 'Energetic and musical',
    emoji: '🦗'
  },
  'firefly': {
    name: 'Firefly',
    scientificName: 'Lampyridae',
    characteristics: ['Bioluminescent', 'Night flyers', 'Light producers'],
    habitat: 'Summer evenings',
    behavior: 'Magical and enchanting',
    emoji: '✨'
  }
};

// Mock AI identification - simulates analyzing an image
export const identifyInsect = async (imageData: string): Promise<InsectInfo> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock identification - randomly select an insect
  const insectTypes = Object.keys(INSECT_DATABASE);
  const randomType = insectTypes[Math.floor(Math.random() * insectTypes.length)];
  
  return INSECT_DATABASE[randomType];
};

// Generate superhero story based on insect characteristics
export const generateSuperheroStory = (insect: InsectInfo): EnhancedStoryData => {
  const heroNames = {
    'ant': ['Captain Colony', 'General Antennae', 'The Mighty Worker'],
    'bee': ['Queen Honey', 'The Golden Guardian', 'Captain Pollinator'],
    'butterfly': ['Madame Metamorphosis', 'The Colorful Crusader', 'Winged Wonder'],
    'ladybug': ['Lady Luck', 'The Spotted Savior', 'Captain Coccinella'],
    'dragonfly': ['Dragon Eye', 'The Swift Sentinel', 'Captain Aerial'],
    'spider': ['Web Weaver', 'The Silk Sentinel', 'Captain Arachnid'],
    'grasshopper': ['The Leaping Legend', 'Captain Chirp', 'The Green Guardian'],
    'firefly': ['The Glowing Guardian', 'Captain Luminescence', 'The Night Light']
  };

  const origins = {
    'ant': [
      `Once a humble worker ant in the bustling colony of Formicidae, ${insect.name} was chosen by the ancient Queen to receive the sacred power of Unity! When the colony faced its greatest threat, this tiny hero emerged with the ability to coordinate thousands of fellow ants through telepathic connection.`,
      `Born in the depths of the underground kingdom, ${insect.name} discovered their incredible strength when they single-handedly lifted a breadcrumb 50 times their body weight! This miraculous feat earned them the title of the colony's mightiest protector.`
    ],
    'bee': [
      `In the golden fields of endless flowers, ${insect.name} was blessed by the ancient Bee Goddess with the power of Sweet Harmony! Their honey not only nourishes but also heals, and their wings carry the melody of nature itself.`,
      `When the great pollination crisis threatened all plant life, ${insect.name} emerged as the chosen one, able to communicate with flowers and orchestrate the most beautiful symphony of growth and renewal.`
    ],
    'butterfly': [
      `From a humble caterpillar's dream, ${insect.name} emerged as the most beautiful transformation the world had ever seen! Their wings carry the colors of the rainbow and the power to bring hope to all who see them.`,
      `Born in a magical cocoon during a solar eclipse, ${insect.name} gained the ability to change colors at will and spread joy wherever they flutter, turning even the darkest days into celebrations of life.`
    ],
    'ladybug': [
      `Blessed by the ancient garden spirits, ${insect.name} became the protector of all plants! Their spots are actually magical runes that ward off evil pests, and their gentle touch can heal any damaged leaf.`,
      `When the great aphid invasion threatened to destroy all gardens, ${insect.name} was chosen by the Lady of Luck herself to become the most adorable yet powerful defender of nature.`
    ],
    'dragonfly': [
      `Ancient and wise, ${insect.name} has lived through countless generations, gaining the power of time manipulation! Their compound eyes can see into the past and future, making them the ultimate guardian of the natural timeline.`,
      `Born during a thunderstorm, ${insect.name} was struck by lightning and gained the ability to fly at incredible speeds, becoming the fastest creature in the insect kingdom and the protector of the skies.`
    ],
    'spider': [
      `Master of the web of destiny, ${insect.name} can weave not just silk, but the very fabric of reality! Their webs are portals to other dimensions, and their patience is legendary among all heroes.`,
      `When the great web of the universe began to unravel, ${insect.name} was chosen by the Spider Goddess to become the guardian of cosmic balance, able to sense danger from miles away.`
    ],
    'grasshopper': [
      `The musical maestro of the meadows, ${insect.name} can create symphonies so beautiful they can calm any storm! Their jumping ability allows them to reach incredible heights and their songs bring peace to all who hear them.`,
      `Born with the rhythm of the earth in their heart, ${insect.name} gained the power to communicate with all living things through their enchanting melodies and became the voice of nature itself.`
    ],
    'firefly': [
      `The light in the darkness, ${insect.name} was blessed by the stars themselves with the power of eternal illumination! Their glow can guide lost souls home and their light can banish any shadow.`,
      `When the great darkness threatened to consume the world, ${insect.name} emerged as the chosen beacon of hope, able to light up entire forests and bring warmth to the coldest hearts.`
    ]
  };

  const powers = {
    'ant': [
      'Super strength (can lift 50 times their body weight!)',
      'Colony coordination telepathy',
      'Underground tunneling abilities',
      'Acid spray defense mechanism'
    ],
    'bee': [
      'Honey healing powers',
      'Flower communication',
      'Pollen manipulation',
      'Sweet harmony voice'
    ],
    'butterfly': [
      'Color-changing camouflage',
      'Joy-spreading wing dust',
      'Metamorphosis transformation',
      'Rainbow trail creation'
    ],
    'ladybug': [
      'Luck manipulation',
      'Plant healing touch',
      'Pest-repelling spots',
      'Garden protection aura'
    ],
    'dragonfly': [
      'Time manipulation',
      'Lightning-fast flight',
      '360-degree vision',
      'Weather prediction'
    ],
    'spider': [
      'Reality-weaving webs',
      'Dimensional portals',
      'Danger sense',
      'Infinite patience'
    ],
    'grasshopper': [
      'Musical magic',
      'Super jumping',
      'Nature communication',
      'Storm calming'
    ],
    'firefly': [
      'Eternal illumination',
      'Shadow banishment',
      'Star communication',
      'Hope spreading'
    ]
  };

  const weaknesses = {
    'ant': 'Gets completely distracted by picnic crumbs and sugary substances',
    'bee': 'Cannot resist the call of beautiful flowers, even in battle',
    'butterfly': 'Becomes mesmerized by bright lights and shiny objects',
    'ladybug': 'Loses all powers when it rains (afraid of getting spots wet)',
    'dragonfly': 'Cannot fly when the wind is too strong',
    'spider': 'Gets tangled in their own webs when nervous',
    'grasshopper': 'Cannot jump when listening to sad music',
    'firefly': 'Loses glow when feeling sad or lonely'
  };

  const nemeses = {
    'ant': 'The Magnifying Glass Menace - a villainous scientist who threatens to expose the secret insect world!',
    'bee': 'The Wasp Warlord - leader of an evil insect army bent on destroying all flowers!',
    'butterfly': 'The Collector - a villain who wants to capture and display all beautiful insects!',
    'ladybug': 'The Aphid Army - an evil swarm that threatens to destroy all gardens!',
    'dragonfly': 'The Wind Witch - a villain who controls the weather to ground our hero!',
    'spider': 'The Vacuum Villain - a cleaning-obsessed enemy who wants to suck up all webs!',
    'grasshopper': 'The Silent Shadow - a villain who steals all sound from the world!',
    'firefly': 'The Darkness Demon - an evil force that wants to extinguish all light!'
  };

  const insectType = insect.name.toLowerCase();
  const heroName = heroNames[insectType as keyof typeof heroNames]?.[Math.floor(Math.random() * 3)] || `Captain ${insect.name}`;
  const origin = origins[insectType as keyof typeof origins]?.[Math.floor(Math.random() * 2)] || `A mysterious ${insect.name} with incredible powers!`;
  const powerList = powers[insectType as keyof typeof powers] || ['Mysterious powers'];
  const weakness = weaknesses[insectType as keyof typeof weaknesses] || 'Unknown weakness';
  const nemesis = nemeses[insectType as keyof typeof nemeses] || 'A mysterious villain';

  // Create narration text for voice synthesis
  const narrationText = `Meet ${heroName}, the amazing ${insect.name} superhero! ${origin} With powers like ${powerList.slice(0, 2).join(' and ')}, this tiny hero protects the insect world from evil. But even heroes have weaknesses - ${heroName} is vulnerable to ${weakness}. Their greatest enemy is ${nemesis}, who threatens to destroy everything our hero holds dear. Will ${heroName} save the day? Only time will tell in this epic tale of courage and determination!`;

  return {
    id: Date.now().toString(),
    heroName,
    insectType: insect.name,
    origin,
    powers: powerList,
    weakness,
    nemesis,
    author: 'You',
    likes: 0,
    comments: 0,
    timestamp: new Date(),
    narrationText
  };
}; 