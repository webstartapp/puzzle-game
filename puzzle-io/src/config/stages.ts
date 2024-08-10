import { LevelId } from './levels';

type Scene = {
  level: LevelId;
  title: string;
  description: string;
};
type StageType<T extends string> = {
  id: T;
  title: string;
  settings: string;
  objective: string;
  characters: string[];
  scenes: Scene[];
  resolution: string;
};

const gameStageFN = <T extends string>(
  stages: StageType<T>[],
): StageType<T>[] => stages;

export const gameStages = gameStageFN([
  {
    id: 'enchanted_forest',
    title: 'The Enchanted Forest',
    settings: 'A lush, magical forest filled with talking animals.',
    objective:
      'Solve puzzles to free the forest animals from mysterious enchantments.',
    characters: ['Orion the Owl', 'Luna the Rabbit'],
    scenes: [
      {
        level: 'level1',
        title: 'The Forest Clearing',
        description:
          'Orion finds a magical map leading to the enchanted forest.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero meets a group of enchanted squirrels needing help,',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero meets a group of enchanted squirrels needing help.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to free the squirrels from their enchantment.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero discovers a hidden path in the forest.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a wise old deer with clues to the next puzzle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to clear a blocked river path.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero finds an ancient tree with carvings of the prophecy.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a mischievous fox guarding the next clue.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to pass the fox's challenge.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          "The hero reaches Orion's nest at the top of the tallest tree.",
      },
    ],
    resolution:
      'Luna the Rabbit informs the hero about the curse and guides them to Orion, who reveals the prophecy.',
  },
  {
    id: 'aquatic_realm',
    title: 'The Aquatic Realm',
    settings: 'An underwater kingdom with vibrant marine life.',
    objective:
      'Solve puzzles to uncover hidden treasures and restore the coral reefs.',
    characters: ['Coral the Dolphin', 'Finley the Fish'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero receives a magical pearl that allows them to breathe underwater.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a school of fish trapped in a net.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to free the trapped fish.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds a sunken ship with a treasure map.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters an octopus guarding a crucial clue.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain the octopus's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero follows the treasure map to a hidden cave.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero discovers a coral garden in need of restoration.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to revive the coral garden.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero reaches the heart of the underwater kingdom.',
      },
    ],
    resolution:
      "Coral the Dolphin explains the disruption in the currents and the hero's need to restore balance.",
  },
  {
    id: 'desert_oasis',
    title: 'The Desert Oasis',
    settings: 'A vast desert with a hidden oasis and ancient ruins.',
    objective: 'Solve puzzles to unlock water sources and revive the oasis.',
    characters: ['Sirocco the Camel', 'Zephyr the Fennec Fox'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an old map leading to the desert oasis.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a group of travelers in need of water.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to find an underground water source.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero discovers ancient ruins with clues to the next puzzle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a sandstorm and seeks shelter.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to navigate through the sandstorm.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient artifact in the ruins.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Zephyr the Fennec Fox with information on the oasis.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Zephyr's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero reaches the hidden oasis and unlocks the water sources.',
      },
    ],
    resolution:
      'Sirocco the Camel reveals the curse affecting the desert and the need to restore the oasis.',
  },
  {
    id: 'mountain_peaks',
    title: 'The Mountain Peaks',
    settings: 'Snow-covered mountains with treacherous paths and hidden caves.',
    objective:
      'Solve puzzles to navigate the mountains and find the legendary Phoenix.',
    characters: ['Blaze the Phoenix', 'Thistle the Mountain Goat'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero receives a magical cloak to withstand the cold.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a group of mountain goats trapped in an avalanche.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to free the trapped goats.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero discovers a hidden cave with ancient carvings.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: ' The hero encounters a blizzard and seeks shelter.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to navigate through the blizzard.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient relic in the cave.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Thistle the Mountain Goat with information on the Phoenix.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Thistle's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero reaches the peak of the mountain and finds Blaze the Phoenix.',
      },
    ],
    resolution:
      "Blaze the Phoenix reveals the prophecy and the hero's role in fulfilling it.",
  },
  {
    id: 'jungle_canopy',
    title: 'The Jungle Canopy',
    settings: 'A dense jungle with towering trees and hidden dangers.',
    objective:
      'Solve puzzles to rescue animals trapped in vines and uncover a secret temple.',
    characters: ['Taro the Tiger', 'Nia the Monkey'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero receives a magical machete to cut through thick vines.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a group of monkeys trapped in the vines.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to free the trapped monkeys.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero discovers a hidden path in the jungle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a wise old parrot with clues to the next puzzle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to clear a blocked river path.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero finds an ancient tree with carvings of the prophecy.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a mischievous monkey guarding the next clue.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to pass the monkey's challenge.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero reaches the secret temple and uncovers its mysteries.',
      },
    ],
    resolution:
      "Taro the Tiger reveals that the jungle's heart has been sealed, affecting the entire ecosystem.",
  },
  {
    id: 'arctic_tundra',
    title: 'The Arctic Tundra',
    settings: 'A frozen tundra with shimmering icebergs and snowy plains.',
    objective: 'Solve puzzles to melt the ice and uncover ancient artifacts.',
    characters: ['Aurora the Polar Bear', 'Frost the Arctic Fox'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero receives a magical torch to melt ice.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a group of seals trapped in ice.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to free the trapped seals.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero discovers an ice cave with ancient carvings.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a snowstorm and seeks shelter.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to navigate through the snowstorm.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient relic in the cave.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Frost the Arctic Fox with information on the artifacts.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Frost's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero reaches the heart of the tundra and uncovers the ancient artifacts.',
      },
    ],
    resolution:
      "Aurora the Polar Bear reveals the prophecy and the hero's role in restoring the balance of the tundra.",
  },
  {
    id: 'volcanic_caverns',
    title: 'The Volcanic Caverns',
    settings:
      'A network of volcanic caves with flowing lava and precious gems.',
    objective:
      'Solve puzzles to stabilize the volcano and prevent an eruption.',
    characters: ['Ember the Dragon', 'Flint the Salamander'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero receives a magical shield to withstand heat.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a group of lizards trapped in the caves.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to free the trapped lizards.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero discovers a hidden chamber with ancient carvings.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a lava flow and seeks shelter.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero solves a puzzle to navigate through the lava flow.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient gem in the chamber.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Flint the Salamander with information on the volcano.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Flint's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero reaches the heart of the volcano and stabilizes it.',
      },
    ],
    resolution:
      "Ember the Dragon reveals the prophecy and the hero's role in preventing the volcano's eruption.",
  },
  {
    id: 'enchanted_gardens',
    title: 'The Enchanted Gardens',
    settings: 'A beautiful garden filled with magical flora and fauna.',
    objective: 'Solve puzzles to revive the dying plants and heal the land.',
    characters: ['Petal the Fairy', 'Thorn the Hedgehog'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero receives a magical watering can to revive plants.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a group of flowers in need of water.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to revive the flowers.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero discovers a hidden path in the garden.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a wise old tree with clues to the next puzzle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to clear a blocked stream.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient seed in the garden.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Thorn the Hedgehog with information on the plants.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Thorn's trust.",
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero reaches the heart of the garden and revives it.',
      },
    ],
    resolution:
      'Petal the Fairy reveals that the curse has drained the magic from the gardens, and only the hero can restore it.',
  },
  {
    id: 'celestial_realm',
    title: 'The Celestial Realm',
    settings:
      'A mystical realm in the sky with floating islands and celestial beings.',
    objective: 'Solve puzzles to align the stars and restore cosmic balance.',
    characters: ['Celeste the Pegasus', 'Orion the Owl'],
    scenes: [
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero receives a magical compass to navigate the sky.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters a group of birds in need of guidance.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to guide the birds.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero discovers a hidden island with ancient carvings.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a storm and seeks shelter.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to navigate through the storm.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero finds an ancient constellation in the carvings.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero encounters Celeste the Pegasus with information on the stars.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: "The hero solves a puzzle to gain Celeste's trust.",
      },
    ],
    resolution:
      'Orion reveals the final piece of the prophecy, guiding the hero to the last challenge.',
  },
  {
    id: 'menagerie_heart',
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
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero arrives at the heart of the menagerie and encounters a dense fog.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to clear the fog.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero finds a broken statue with clues to the next puzzle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters a barrier of darkness.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to dispel the darkness.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero discovers an ancient inscription with the final riddle.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero encounters the source of the curse.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves a puzzle to weaken the curse.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description:
          'The hero uses the collected items to confront the source.',
      },
      {
        level: 'level2',
        title: 'The Enchanted Squirrels',
        description: 'The hero solves the final puzzle to lift the curse.',
      },
    ],
    resolution:
      'The hero gathers all the allies and items collected throughout the journey to confront the source of the curse and save the enchanted menagerie.',
  },
]);

export type GameStageID = (typeof gameStages)[number]['id'];
