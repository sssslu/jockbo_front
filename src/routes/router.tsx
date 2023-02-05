import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../pages/ErrorPage';
import SearchPage from '../pages/SearchPage';
import TotalPage from '../pages/TotalPage';
import AboutPage from '../pages/AboutPage';
import ApplyPage from '../pages/ApplyPage';
import JockBoPage from '../pages/JockBoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <SearchPage />,
      },
      {
        path: '/total',
        element: <TotalPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/apply',
        element: <ApplyPage />,
      },
    ],
  },
  {
    path: '/jockBo/:userId/:kind',
    element: <JockBoPage />,
    errorElement: <ErrorPage />,
  },
]);
