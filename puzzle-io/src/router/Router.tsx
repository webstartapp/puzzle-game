import { createContext, FC, useContext, useState } from 'react';
import IntroScreen from '@/router/routes/IntroScreen';
import PuzzleScreen from '@/router//routes/PuzzleScreen';
import StageScreen from '@/router/routes/StageScreen';

type Route<ROUTE extends string> = {
  name: ROUTE;
  component: FC;
};

const RouteFN = <ROUTE extends string>(routes: Route<ROUTE>[]) => {
  return routes;
};

const routeList = RouteFN([
  {
    name: 'index',
    component: IntroScreen,
  },
  {
    name: 'puzzleScreen',
    component: PuzzleScreen,
  },
  {
    name: 'stageScreen',
    component: StageScreen,
  },
]);

type RouterKeys = typeof routeList extends Route<infer ROUTE>[] ? ROUTE : never;

const RouterContext = createContext<{
  route: Route<RouterKeys>;
  setRoute: (route: RouterKeys) => void;
}>({
  route: routeList[0],
  setRoute: () => {},
});

export const useGameRouter = () => {
  const context = useContext(RouterContext);
  return context;
};

const RouterProvider = () => {
  const [routeInner, setInnerRoute] = useState<Route<RouterKeys>>(routeList[0]);

  const setRoute = (route: RouterKeys) => {
    const currentRoute = routeList.find((r) => r.name === route);
    if (!currentRoute) {
      console.error('Route not found');
      setInnerRoute(routeList[0]);
      return;
    }
    setInnerRoute(currentRoute);
  };

  return (
    <RouterContext.Provider
      value={{
        route: routeInner,
        setRoute,
      }}
    >
      {<routeInner.component />}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
