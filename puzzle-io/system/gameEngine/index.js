import GameLoop from './GameLoop';
import GameEngine from './GameEngine';
import DefaultRenderer from './DefaultRenderer';
import DefaultTimer from './DefaultTimer';

const DefaultTouchProcessor = () => {};

export {
  GameLoop,
  GameLoop as BasicGameLoop,
  GameEngine,
  GameEngine as ComponentEntitySystem,
  GameEngine as ComponentEntitySystems,
  DefaultTouchProcessor,
  DefaultRenderer,
  DefaultTimer,
};
