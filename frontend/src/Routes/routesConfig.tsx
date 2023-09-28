// src/routes/routesConfig.ts
import { Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import HomePage from './Home';
import LoginPage from './Login'
import NavBar from '../Components/Navbar';

interface RouteConfig  {
    path: string,
    element: JSX.Element,
    errorElement?: JSX.Element | null,
    children?: RouteConfig[] | null
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <NavBar/> ,
    errorElement:<ErrorPage/>,
    children : [
      {
        path: '',
        element: <HomePage/> ,
      },
      {
        path: '/login',
        element: <LoginPage/>,
      },
    ]
  },

];

const generateRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={route.element}
    >
      {route.children && route.children.length > 0 && (
        generateRoutes(route.children)
      )}
    </Route>
  ))
}

export {routes, generateRoutes}
