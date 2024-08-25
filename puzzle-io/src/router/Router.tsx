import { createContext, FC, useContext, useEffect, useState } from 'react';
import IntroScreen from '@/router/routes/IntroScreen';
import PuzzleScreen from '@/router//routes/PuzzleScreen';
import PuzzleScreenAnimation from '@/router/routes/PuzzleScreenAnimation';
import StageScreen from '@/router/routes/StageMapScreen';
import WorldMapScreen from '@/router/routes/WorldMapScreen';
import PuzzleScreenSuccess from './routes/PuzzleSuccessAnimation';
import * as Linking from 'expo-linking';
import PrivacyPolicy from './routes/TermsScreen';
import MenuModal from '@/components/modals/MenuModal';
import CreditScreen from './routes/CreditScreen';

type Route<
  ROUTE extends string,
  PARAMS extends Record<string, any> | never,
  SLUG extends string = string,
> = {
  path: ROUTE;
  component: FC<PARAMS>;
  slug?: SLUG;
};

const RouteFN = <
  ROUTE extends string,
  PARAMS extends Record<string, any> | never = never,
  SLUG extends string = string,
>(
  route: Route<ROUTE, PARAMS, SLUG>,
): {
  path: ROUTE;
  component: FC<PARAMS>;
  props: PARAMS;
  slug: SLUG;
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
    path: 'puzzleScreenAnimation',
    component: PuzzleScreenAnimation,
  }),
  RouteFN({
    path: 'WorldMapScreen',
    component: WorldMapScreen,
  }),
  RouteFN({
    path: 'StageMapScreen',
    component: StageScreen,
  }),
  RouteFN({
    path: 'PuzzleSuccessAnimation',
    component: PuzzleScreenSuccess,
  }),
  RouteFN({
    path: 'terms',
    component: PrivacyPolicy,
    slug: 'terms',
  }),
  RouteFN({
    path: 'credits',
    component: CreditScreen,
    slug: 'credits',
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
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}>({
  route: routeList[0], // Default value
  setRoute: () => {},
  showMenu: false,
  setShowMenu: () => {},
});

export const useGameRouter = () => {
  const context = useContext(RouterContext);
  return context;
};

const RouterProvider = () => {
  const [routeInner, setInnerRoute] = useState(
    routeList[0] as (typeof routeList)[number],
  );
  const [showMenu, setShowMenu] = useState(false);

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
  useEffect(() => {
    const checkSlugInURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const parsedUrl = new URL(initialUrl);
        const slug = parsedUrl.pathname.replace('/', ''); // Remove the leading slash
        const matchedRoute = routeList.find((route) => route.slug === slug);

        if (matchedRoute) {
          setInnerRoute(matchedRoute);
        }
      }
    };

    checkSlugInURL();
  }, []);

  const Component = routeInner.component as FC<any>;

  return (
    <RouterContext.Provider
      value={{
        route: routeInner,
        setRoute,
        showMenu,
        setShowMenu,
      }}
    >
      <Component {...(routeInner.props || {})} />
      <MenuModal
        shown={showMenu}
        setShown={setShowMenu}
      />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
