import { Numberify } from './grid/indexedGrid';
import { LevelId } from './levels';
import aquatic_realm from '@/assets/images/stages/aquatic_realm.jpg';
import arctic_tundra from '@/assets/images/stages/arctic_tundra.jpg';
import celestial_realm from '@/assets/images/stages/celestial_realm.jpg';
import desert_oasis from '@/assets/images/stages/desert_oasis.jpg';
import enchanted_forest from '@/assets/images/stages/enchanted_forest.jpg';
import enchanted_gardens from '@/assets/images/stages/enchanted_gardens.jpg';
import jungle_canopy from '@/assets/images/stages/jungle_canopy.jpg';
import mountain_peaks from '@/assets/images/stages/mountain_peaks.jpg';
import volcanic_caverns from '@/assets/images/stages/volcanic_caverns.jpg';
import menagerie_heart from '@/assets/images/stages/menagerie_heart.jpg';
import { ImageSourcePropType } from 'react-native';

type OneTo20 =
  | Numberify<`${1}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`>
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 20;

export type Scene = {
  level: LevelId;
  title: string;
  description: string;
  x: OneTo20;
  y: OneTo20;
};
type StageType<T extends string> = {
  id: T;
  title: string;
  settings: string;
  objective: string;
  characters: string[];
  scenes: Scene[];
  resolution: string;
  x: OneTo20;
  y: OneTo20;
  image: ImageSourcePropType;
  order: number;
};

const gameStageFN = <T extends string>(
  stages: Omit<StageType<T>, 'order'>[],
): StageType<T>[] => stages.map((stage, index) => ({ ...stage, order: index }));

export const gameStages = gameStageFN([
  {
    id: 'enchanted_forest',
    x: 10,
    y: 13,
    title: 'The Enchanted Forest',
    settings: 'A lush, magical forest filled with talking animals.',
    objective:
      'Solve puzzles to free the forest animals from mysterious enchantments.',
    characters: ['Orion the Owl', 'Luna the Rabbit'],
    scenes: [
      {
        level: 'level1x1',
        title: 'The Forest Clearing',
        description:
          'Orion finds a magical map leading to the enchanted forest.',
        x: 10,
        y: 17,
      },
      {
        level: 'level1x2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero meets a group of enchanted squirrels needing help,',
        x: 10,
        y: 13,
      },
      {
        level: 'level1x3',
        title: 'The Enchanted Squirrels',
        description:
          'The hero meets a group of enchanted squirrels needing help.',
        x: 7,
        y: 11,
      },
      {
        level: 'level1x4',
        title: 'The squirrel puzzle',
        description:
          'The hero solves a puzzle to free the squirrels from their enchantment.',
        x: 2,
        y: 10,
      },
      {
        level: 'level1x5',
        title: 'Hidden path',
        description: 'The hero discovers a hidden path in the forest.',
        x: 3,
        y: 6,
      },
      {
        level: 'level1x6',
        title: 'The wise old deer',
        description:
          'The hero encounters a wise old deer with clues to the next puzzle.',
        x: 7,
        y: 3,
      },
      {
        level: 'level1x7',
        title: 'The River Crossing',
        description: 'The hero solves a puzzle to clear a blocked river path.',
        x: 13,
        y: 3,
      },
      {
        level: 'level1x8',
        title: 'The Ancient Tree',
        description:
          'The hero finds an ancient tree with carvings of the prophecy.',
        x: 17,
        y: 16,
      },
      {
        level: 'level1x9',
        title: 'The mischievous fox',
        description:
          'The hero encounters a mischievous fox guarding the next clue.',
        x: 14,
        y: 15,
      },
      {
        level: 'level1x10',
        title: 'The Fox Challenge',
        description: "The hero solves a puzzle to pass the fox's challenge.",
        x: 12,
        y: 12,
      },
    ],
    resolution:
      'Luna the Rabbit informs the hero about the curse and guides them to Orion, who reveals the prophecy.',
    image: enchanted_forest,
  },
  {
    id: 'aquatic_realm',
    x: 6,
    y: 17,
    title: 'The Aquatic Realm',
    settings: 'An underwater kingdom with vibrant marine life.',
    objective:
      'Solve puzzles to uncover hidden treasures and restore the coral reefs.',
    characters: ['Coral the Dolphin', 'Finley the Fish'],
    scenes: [
      {
        level: 'level2x1',
        title: 'The Magical Pearl',
        x: 18,
        y: 6,
        description:
          'The hero receives a magical pearl that allows them to breathe underwater.',
      },
      {
        level: 'level2x2',
        title: 'The school of fish',
        x: 15,
        y: 3,
        description: 'The hero encounters a school of fish trapped in a net.',
      },
      {
        level: 'level2x3',
        title: 'The fish rescue',
        x: 10,
        y: 5,
        description: 'The hero solves a puzzle to free the trapped fish.',
      },
      {
        level: 'level2x4',
        title: 'The sunken ship',
        x: 5,
        y: 7,
        description: 'The hero finds a sunken ship with a treasure map.',
      },
      {
        level: 'level2x5',
        title: 'The octopus guardian',
        x: 9,
        y: 10,
        description: 'The hero encounters an octopus guarding a crucial clue.',
      },
      {
        level: 'level2x6',
        title: 'The octopus challenge',
        x: 8,
        y: 13,
        description: "The hero solves a puzzle to gain the octopus's trust.",
      },
      {
        level: 'level2x7',
        title: 'The hidden cave',
        x: 4,
        y: 10,
        description: 'The hero follows the treasure map to a hidden cave.',
      },
      {
        level: 'level2x8',
        title: 'The coral garden',
        x: 3,
        y: 15,
        description:
          'The hero discovers a coral garden in need of restoration.',
      },
      {
        level: 'level2x9',
        title: 'The coral challenge',
        x: 6,
        y: 17,
        description: 'The hero solves a puzzle to revive the coral garden.',
      },
      {
        level: 'level2x10',
        title: 'The heart of the sea',
        x: 11,
        y: 15,

        description: 'The hero reaches the heart of the underwater kingdom.',
      },
    ],
    resolution:
      "Coral the Dolphin explains the disruption in the currents and the hero's need to restore balance.",
    image: aquatic_realm,
  },
  {
    id: 'desert_oasis',
    x: 2,
    y: 14,
    title: 'The Desert Oasis',
    settings: 'A vast desert with a hidden oasis and ancient ruins.',
    objective: 'Solve puzzles to unlock water sources and revive the oasis.',
    characters: ['Sirocco the Camel', 'Zephyr the Fennec Fox'],
    scenes: [
      {
        level: 'level3x1',
        title: 'The desert map',
        x: 17,
        y: 5,
        description: 'The hero finds an old map leading to the desert oasis.',
      },
      {
        level: 'level3x2',
        title: 'The Encountered Traveler',
        x: 9,
        y: 4,
        description:
          'The hero encounters a group of travelers in need of water.',
      },
      {
        level: 'level3x3',
        title: 'The underground water source',
        x: 8,
        y: 7,
        description:
          'The hero solves a puzzle to find an underground water source.',
      },
      {
        level: 'level3x4',
        title: 'The ancient ruins',
        x: 2,
        y: 12,
        description:
          'The hero discovers ancient ruins with clues to the next puzzle.',
      },
      {
        level: 'level3x5',
        title: 'The sandstorm',
        x: 7,
        y: 11,
        description: 'The hero encounters a sandstorm and seeks shelter.',
      },
      {
        level: 'level3x6',
        title: 'The sandstorm nagiagation',
        x: 9,
        y: 12,
        description:
          'The hero solves a puzzle to navigate through the sandstorm.',
      },
      {
        level: 'level3x7',
        title: 'The ancient artifact',
        x: 15,
        y: 14,
        description: 'The hero finds an ancient artifact in the ruins.',
      },
      {
        level: 'level3x8',
        title: 'The Fennec Fox',
        x: 14,
        y: 17,
        description:
          'The hero encounters Zephyr the Fennec Fox with information on the oasis.',
      },
      {
        level: 'level3x9',
        title: 'The Fennec Fox trust',
        x: 12,
        y: 15,
        description: "The hero solves a puzzle to gain Zephyr's trust.",
      },
      {
        level: 'level3x10',
        title: 'The hidden oasis',
        x: 8,
        y: 16,
        description:
          'The hero reaches the hidden oasis and unlocks the water sources.',
      },
    ],
    resolution:
      'Sirocco the Camel reveals the curse affecting the desert and the need to restore the oasis.',
    image: desert_oasis,
  },
  {
    id: 'mountain_peaks',
    x: 1,
    y: 10,
    title: 'The Mountain Peaks',
    settings: 'Snow-covered mountains with treacherous paths and hidden caves.',
    objective:
      'Solve puzzles to navigate the mountains and find the legendary Phoenix.',
    characters: ['Blaze the Phoenix', 'Thistle the Mountain Goat'],
    scenes: [
      {
        level: 'level4x1',
        title: 'The Cloak',
        x: 14,
        y: 18,
        description: 'The hero receives a magical cloak to withstand the cold.',
      },
      {
        level: 'level4x2',
        title: 'The Avalanche',
        x: 13,
        y: 13,
        description:
          'The hero encounters a group of mountain goats trapped in an avalanche.',
      },
      {
        level: 'level4x3',
        title: 'The trapped goats',
        x: 10,
        y: 15,
        description: 'The hero solves a puzzle to free the trapped goats.',
      },
      {
        level: 'level4x4',
        title: 'The hidden cave',
        x: 4,
        y: 13,
        description: 'The hero discovers a hidden cave with ancient carvings.',
      },
      {
        level: 'level4x5',
        title: 'The blizzard',
        x: 5,
        y: 11,
        description: ' The hero encounters a blizzard and seeks shelter.',
      },
      {
        level: 'level4x6',
        title: 'The blizzard navigation',
        x: 9,
        y: 12,
        description:
          'The hero solves a puzzle to navigate through the blizzard.',
      },
      {
        level: 'level4x7',
        title: 'The ancient relic',
        x: 12,
        y: 11,
        description: 'The hero finds an ancient relic in the cave.',
      },
      {
        level: 'level4x8',
        title: 'The Mountain Goat',
        x: 8,
        y: 9,
        description:
          'The hero encounters Thistle the Mountain Goat with information on the Phoenix.',
      },
      {
        level: 'level4x9',
        title: 'The Mountain Goat trust',
        x: 7,
        y: 6,
        description: "The hero solves a puzzle to gain Thistle's trust.",
      },
      {
        level: 'level4x10',
        title: 'The peak of the mountain',
        x: 9,
        y: 2,
        description:
          'The hero reaches the peak of the mountain and finds Blaze the Phoenix.',
      },
    ],
    resolution:
      "Blaze the Phoenix reveals the prophecy and the hero's role in fulfilling it.",
    image: mountain_peaks,
  },
  {
    id: 'jungle_canopy',
    x: 2,
    y: 7,
    title: 'The Jungle Canopy',
    settings: 'A dense jungle with towering trees and hidden dangers.',
    objective:
      'Solve puzzles to rescue animals trapped in vines and uncover a secret temple.',
    characters: ['Taro the Tiger', 'Nia the Monkey'],
    scenes: [
      {
        level: 'level5x1',
        title: 'The Magical Machete',
        x: 10,
        y: 17,
        description:
          'The hero receives a magical machete to cut through thick vines.',
      },
      {
        level: 'level5x2',
        title: 'The trapped monkeys',
        x: 7,
        y: 15,
        description:
          'The hero encounters a group of monkeys trapped in the vines.',
      },
      {
        level: 'level5x3',
        title: 'The monkey rescue',
        x: 5,
        y: 16,
        description: 'The hero solves a puzzle to free the trapped monkeys.',
      },
      {
        level: 'level5x4',
        title: 'The hidden path',
        x: 3,
        y: 12,
        description: 'The hero discovers a hidden path in the jungle.',
      },
      {
        level: 'level5x5',
        title: 'The wise old parrot',
        x: 6,
        y: 10,
        description:
          'The hero encounters a wise old parrot with clues to the next puzzle.',
      },
      {
        level: 'level5x6',
        title: 'The River Crossing',
        x: 10,
        y: 4,
        description: 'The hero solves a puzzle to clear a blocked river path.',
      },
      {
        level: 'level5x7',
        title: 'The Ancient Tree',
        x: 13,
        y: 10,
        description:
          'The hero finds an ancient tree with carvings of the prophecy.',
      },
      {
        level: 'level5x8',
        title: 'The mischievous monkey',
        x: 12,
        y: 13,
        description:
          'The hero encounters a mischievous monkey guarding the next clue.',
      },
      {
        level: 'level5x9',
        title: 'The monkey challenge',
        x: 16,
        y: 15,
        description: "The hero solves a puzzle to pass the monkey's challenge.",
      },
      {
        level: 'level5x10',
        title: 'The secret temple',
        x: 17,
        y: 9,
        description:
          'The hero reaches the secret temple and uncovers its mysteries.',
      },
    ],
    resolution:
      "Taro the Tiger reveals that the jungle's heart has been sealed, affecting the entire ecosystem.",
    image: jungle_canopy,
  },
  {
    id: 'volcanic_caverns',
    x: 5,
    y: 6,
    title: 'The Volcanic Caverns',
    settings:
      'A network of volcanic caves with flowing lava and precious gems.',
    objective:
      'Solve puzzles to stabilize the volcano and prevent an eruption.',
    characters: ['Ember the Dragon', 'Flint the Salamander'],
    scenes: [
      {
        level: 'level6x1',
        title: 'The Magical Shield',
        x: 3,
        y: 10,
        description: 'The hero receives a magical shield to withstand heat.',
      },
      {
        level: 'level6x2',
        title: 'The trapped lizards',
        x: 6,
        y: 12,
        description:
          'The hero encounters a group of lizards trapped in the caves.',
      },
      {
        level: 'level6x3',
        title: 'The lizard rescue',
        x: 9,
        y: 17,
        description: 'The hero solves a puzzle to free the trapped lizards.',
      },
      {
        level: 'level6x4',
        title: 'The hidden chamber',
        x: 15,
        y: 16,
        description:
          'The hero discovers a hidden chamber with ancient carvings.',
      },
      {
        level: 'level6x5',
        title: 'The lava flow',
        x: 12,
        y: 14,
        description: 'The hero encounters a lava flow and seeks shelter.',
      },
      {
        level: 'level6x6',
        title: 'The lava navigation',
        x: 10,
        y: 13,
        description:
          'The hero solves a puzzle to navigate through the lava flow.',
      },
      {
        level: 'level6x7',
        title: 'The ancient gem',
        x: 7,
        y: 9,
        description: 'The hero finds an ancient gem in the chamber.',
      },
      {
        level: 'level6x8',
        title: 'The Salamander',
        x: 4,
        y: 6,
        description:
          'The hero encounters Flint the Salamander with information on the volcano.',
      },
      {
        level: 'level6x9',
        title: 'The Salamander trust',
        x: 5,
        y: 3,
        description: "The hero solves a puzzle to gain Flint's trust.",
      },
      {
        level: 'level6x10',
        title: 'The heart of the volcano',
        x: 12,
        y: 3,
        description:
          'The hero reaches the heart of the volcano and stabilizes it.',
      },
    ],
    resolution:
      "Ember the Dragon reveals the prophecy and the hero's role in preventing the volcano's eruption.",
    image: volcanic_caverns,
  },
  {
    id: 'enchanted_gardens',
    x: 8,
    y: 7,
    title: 'The Enchanted Gardens',
    settings: 'A beautiful garden filled with magical flora and fauna.',
    objective: 'Solve puzzles to revive the dying plants and heal the land.',
    characters: ['Petal the Fairy', 'Thorn the Hedgehog'],
    scenes: [
      {
        level: 'level7x1',
        title: 'The Magical Watering Can',
        x: 10,
        y: 10,
        description:
          'The hero receives a magical watering can to revive plants.',
      },
      {
        level: 'level7x2',
        title: 'The thirsty flowers',
        x: 8,
        y: 8,
        description: 'The hero encounters a group of flowers in need of water.',
      },
      {
        level: 'level7x3',
        title: 'The flower revival',
        x: 5,
        y: 6,
        description: 'The hero solves a puzzle to revive the flowers.',
      },
      {
        level: 'level7x4',
        title: 'The hidden path',
        x: 3,
        y: 3,
        description: 'The hero discovers a hidden path in the garden.',
      },
      {
        level: 'level7x5',
        title: 'The wise old tree',
        x: 2,
        y: 8,
        description:
          'The hero encounters a wise old tree with clues to the next puzzle.',
      },
      {
        level: 'level7x6',
        title: 'The Stream Crossing',
        x: 5,
        y: 15,
        description: 'The hero solves a puzzle to clear a blocked stream.',
      },
      {
        level: 'level7x7',
        title: 'The Ancient Seed',
        x: 8,
        y: 17,
        description: 'The hero finds an ancient seed in the garden.',
      },
      {
        level: 'level7x8',
        title: 'The Hedgehog',
        x: 10,
        y: 18,
        description:
          'The hero encounters Thorn the Hedgehog with information on the plants.',
      },
      {
        level: 'level7x9',
        title: 'The Hedgehog trust',
        x: 15,
        y: 15,
        description: "The hero solves a puzzle to gain Thorn's trust.",
      },
      {
        level: 'level7x10',
        title: 'The heart of the garden',
        x: 14,
        y: 10,

        description: 'The hero reaches the heart of the garden and revives it.',
      },
    ],
    resolution:
      'Petal the Fairy reveals that the curse has drained the magic from the gardens, and only the hero can restore it.',
    image: enchanted_gardens,
  },
  {
    id: 'celestial_realm',
    x: 10,
    y: 5,
    title: 'The Celestial Realm',
    settings:
      'A mystical realm in the sky with floating islands and celestial beings.',
    objective: 'Solve puzzles to align the stars and restore cosmic balance.',
    characters: ['Celeste the Pegasus', 'Orion the Owl'],
    scenes: [
      {
        level: 'level8x1',
        title: 'The Magical Compass',
        x: 3,
        y: 15,
        description: 'The hero receives a magical compass to navigate the sky.',
      },
      {
        level: 'level8x2',
        title: 'The Enchanted Birds',
        x: 6,
        y: 17,
        description:
          'The hero encounters a group of birds in need of guidance.',
      },
      {
        level: 'level8x3',
        title: 'The bird guidance',
        x: 10,
        y: 17,
        description: 'The hero solves a puzzle to guide the birds.',
      },
      {
        level: 'level8x4',
        title: 'The hidden island',
        x: 18,
        y: 16,
        description:
          'The hero discovers a hidden island with ancient carvings.',
      },
      {
        level: 'level8x5',
        title: 'The star constellation',
        x: 15,
        y: 14,
        description: 'The hero encounters a storm and seeks shelter.',
      },
      {
        level: 'level8x6',
        title: 'The storm navigation',
        x: 10,
        y: 15,
        description: 'The hero solves a puzzle to navigate through the storm.',
      },
      {
        level: 'level8x7',
        title: 'The ancient constellation',
        x: 6,
        y: 14,
        description: 'The hero finds an ancient constellation in the carvings.',
      },
      {
        level: 'level8x8',
        title: 'The Pegasus',
        x: 10,
        y: 12,
        description:
          'The hero encounters Celeste the Pegasus with information on the stars.',
      },
      {
        level: 'level8x9',
        title: 'The Pegasus Challenge',
        x: 14,
        y: 13,
        description: 'The hero Chalenge the Pegasus in riddles.',
      },
      {
        level: 'level8x10',
        title: 'The Pegasus trust',
        x: 18,
        y: 13,
        description: "The hero solves a puzzle to gain Celeste's trust.",
      },
    ],
    resolution:
      'Orion reveals the final piece of the prophecy, guiding the hero to the last challenge.',
    image: celestial_realm,
  },
  {
    id: 'arctic_tundra',
    x: 16,
    y: 4,
    title: 'The Arctic Tundra',
    settings: 'A frozen tundra with shimmering icebergs and snowy plains.',
    objective: 'Solve puzzles to melt the ice and uncover ancient artifacts.',
    characters: ['Aurora the Polar Bear', 'Frost the Arctic Fox'],
    scenes: [
      {
        level: 'level9x1',
        title: 'The Magical Torch',
        x: 2,
        y: 10,
        description: 'The hero receives a magical torch to melt ice.',
      },
      {
        level: 'level9x2',
        title: 'The trapped seals',
        x: 5,
        y: 13,
        description: 'The hero encounters a group of seals trapped in ice.',
      },
      {
        level: 'level9x3',
        title: 'The seal rescue',
        x: 8,
        y: 17,
        description: 'The hero solves a puzzle to free the trapped seals.',
      },
      {
        level: 'level9x4',
        title: 'The hidden cave',
        x: 16,
        y: 15,
        description: 'The hero discovers an ice cave with ancient carvings.',
      },
      {
        level: 'level9x5',
        title: 'The snowstorm',
        x: 15,
        y: 12,
        description: 'The hero encounters a snowstorm and seeks shelter.',
      },
      {
        level: 'level9x6',
        title: 'The snowstorm navigation',
        x: 10,
        y: 13,
        description:
          'The hero solves a puzzle to navigate through the snowstorm.',
      },
      {
        level: 'level9x7',
        title: 'The ancient relic',
        x: 6,
        y: 9,
        description: 'The hero finds an ancient relic in the cave.',
      },
      {
        level: 'level9x8',
        title: 'The Arctic Fox',
        x: 4,
        y: 6,
        description:
          'The hero encounters Frost the Arctic Fox with information on the artifacts.',
      },
      {
        level: 'level9x9',
        title: 'The Arctic Fox trust',
        x: 5,
        y: 3,
        description: "The hero solves a puzzle to gain Frost's trust.",
      },
      {
        level: 'level9x10',
        title: 'The heart of the tundra',
        x: 8,
        y: 4,
        description:
          'The hero reaches the heart of the tundra and uncovers the ancient artifacts.',
      },
    ],
    resolution:
      "Aurora the Polar Bear reveals the prophecy and the hero's role in restoring the balance of the tundra.",
    image: arctic_tundra,
  },
  {
    id: 'menagerie_heart',
    x: 11,
    y: 10,
    title: 'The Heart of the Menagerie',
    settings:
      'The central hub of all animal kingdoms, now shrouded in darkness.',
    objective:
      'Solve the final, most challenging puzzles to lift the curse and restore harmony.',
    characters: [
      'Orion the Owl',
      'Luna the Rabbit',
      'Coral the Dolphin',
      'Sirocco the Camel',
      'Blaze the Phoenix',
      'Taro the Tiger',
      'Aurora the Polar Bear',
      'Ember the Dragon',
      'Petal the Fairy',
      'Celeste the Pegasus',
    ],
    scenes: [
      {
        level: 'level10x1',
        title: 'The dense fog',
        x: 6,
        y: 4,
        description:
          'The hero arrives at the heart of the menagerie and encounters a dense fog.',
      },
      {
        level: 'level10x2',
        title: 'The fog puzzle',
        x: 9,
        y: 2,
        description: 'The hero solves a puzzle to clear the fog.',
      },
      {
        level: 'level10x3',
        title: 'The broken statue',
        x: 14,
        y: 7,
        description:
          'The hero finds a broken statue with clues to the next puzzle.',
      },
      {
        level: 'level10x4',
        title: 'The enchanted barrier',
        x: 17,
        y: 9,

        description: 'The hero encounters a barrier of darkness.',
      },
      {
        level: 'level10x5',
        title: 'The barrier puzzle',
        x: 18,
        y: 12,
        description: 'The hero solves a puzzle to dispel the darkness.',
      },
      {
        level: 'level10x6',
        title: 'The ancient inscription',
        x: 11,
        y: 10,
        description:
          'The hero discovers an ancient inscription with the final riddle.',
      },
      {
        level: 'level10x7',
        title: 'The source of the curse',
        x: 10,
        y: 7,
        description: 'The hero encounters the source of the curse.',
      },
      {
        level: 'level10x8',
        title: 'The curse puzzle',
        x: 6,
        y: 8,
        description: 'The hero solves a puzzle to weaken the curse.',
      },
      {
        level: 'level10x9',
        title: 'The collected items',
        x: 2,
        y: 9,
        description:
          'The hero uses the collected items to confront the source.',
      },
      {
        level: 'level10x10',
        title: 'The Hearth of the Menagerie',
        x: 4,
        y: 13,
        description: 'The hero solves the final puzzle to lift the curse.',
      },
    ],
    resolution:
      'The hero gathers all the allies and items collected throughout the journey to confront the source of the curse and save the enchanted menagerie.',
    image: menagerie_heart,
  },
]);

export type GameStage = (typeof gameStages)[number];

export type GameStageID = GameStage['id'];
