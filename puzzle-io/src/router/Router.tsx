import { createContext, FC, useContext, useEffect, useState } from 'react';
import IntroScreen from '@/router/routes/IntroScreen';
import PuzzleScreen from '@/router//routes/PuzzleScreen';
import StageScreen from '@/router/routes/StageMapScreen';
import WorldMapScreen from '@/router/routes/WorldMapScreen';

type Route<ROUTE extends string, PARAMS extends Record<string, any> | never> = {
  path: ROUTE;
  component: FC<PARAMS>;
};

const RouteFN = <
  ROUTE extends string,
  PARAMS extends Record<string, any> | never = never,
>(
  route: Route<ROUTE, PARAMS>,
): {
  path: ROUTE;
  component: FC<PARAMS>;
  props: PARAMS;
} => {
  const out: any = {
    ...route,
  };
  return out;
};

const routeList = [
  RouteFN({
    path: 'index',
    component: IntroScreen,
  }),
  RouteFN({
    path: 'puzzleScreen',
    component: PuzzleScreen,
  }),
  RouteFN({
    path: 'WorldMapScreen',
    component: WorldMapScreen,
  }),
  RouteFN({
    path: 'StageMapScreen',
    component: StageScreen,
  }),
];

type SingleRouteType = (typeof routeList)[number];
type RouterKeys = SingleRouteType['path'];
export type RouterPath = RouterKeys;

type RouteParamsMap = {
  [K in RouterKeys]: Extract<SingleRouteType, { path: K }> extends {
    props: infer P;
  }
    ? P
    : never;
};

const RouterContext = createContext<{
  route: (typeof routeList)[number];
  setRoute: <K extends RouterKeys>(
    route: K,
    params?: RouteParamsMap[K],
  ) => void;
}>({
  route: routeList[0], // Default value
  setRoute: () => {},
});

export const useGameRouter = () => {
  const context = useContext(RouterContext);
  return context;
};

const RouterProvider = () => {
  const [routeInner, setInnerRoute] = useState(
    routeList[0] as (typeof routeList)[number],
  );
  const setRoute = <K extends RouterKeys>(
    route: K,
    params?: RouteParamsMap[K],
  ) => {
    const currentRoute = routeList.find(
      (r) => r.path === route,
    ) as (typeof routeList)[number];
    if (!currentRoute) {
      console.error('Route not found');
      setInnerRoute(routeList[0] as (typeof routeList)[number]);
      return;
    }
    if (params) {
      currentRoute.props = params as any;
    }
    setInnerRoute({
      ...currentRoute,
    } as SingleRouteType);
  };

  const Component = routeInner.component as FC<any>;

  return (
    <RouterContext.Provider
      value={{
        route: routeInner,
        setRoute,
      }}
    >
      <Component {...(routeInner.props || {})} />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
