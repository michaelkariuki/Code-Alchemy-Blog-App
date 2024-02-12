// src/routes/routesConfig.ts
import { Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import HomePage from "./Home";
import LoginPage from "./Login";
import BasicLayout from "./BasicLayout";
import SignupFormWrapper from "../Components/SignupFormWrapper";
import ProfilePage from "./Profile";
import ReadingLists from "../Components/ReadingLists";
import App from "../App";
import config from "../config";
import TopicsList from "../Components/TopicsLists";
import NewLists from "../Components/NewLists";
import PopularLists from "../Components/PopularLists";
import BlogEditor from "../Components/BlogEditor/BlogEditor";
import BlogPage from "../Components/Blog/BlogPage";
// import NavBar from '../Components/Navbar';
// import SignupPage from './AccountSignup';
// import SignupPage2 from './ProfileSignup';

interface RouteConfig {
  index?: boolean | null;
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element | null;
  children?: RouteConfig[] | null;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BasicLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: (
              <HomePage
                blogCarouselItems={config.blogListItemPropsWithPrevText}
                homeCardItems={{
                  cards: config.largeCardMiniCardsHomeProps,
                  slider: config.SidePanelSliderHomeProps,
                }}
              />
            ),
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupFormWrapper />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/profile/:username",
            element: (
              <ProfilePage
                userProps={config.userProfileProps}
                contentProps={config.contentProps}
              />
            ),
          },
          {
            path: "/reading-lists",
            element: <ReadingLists/>,
          },
          {
            path: "/topics",
            element: <TopicsList/>,
          },
          {
            path: "/new",
            element: (
              <NewLists/>
            ),
          },
          {
            path: "/popular",
            element: (
              <PopularLists
                ReadingListsType={config.ReadingListsData[0]}
                content={config.popularListsItemProps}
              />
            ),
          },
          {
            path: "/blog/new",
            element: (
              <BlogEditor/>
            ),
          },
          {
            path: "/blog/new/preview",
            element: (
              <BlogPage />
            ),
          },
        ],
      },
    ],
  },
];

const generateRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children &&
        route.children.length > 0 &&
        generateRoutes(route.children)}
    </Route>
  ));
};

export { routes, generateRoutes };
