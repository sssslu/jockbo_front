import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../pages/ErrorPage';
import SearchPage from '../pages/SearchPage';
import JockBo8Page from '../pages/JockBo8Page';
import JockBoEBookPage from '../pages/JockBoEBookPage';

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
        path: '/eBook/:targetPage/:targetId',
        element: <JockBoEBookPage />,
      },
    ],
  },
  {
    path: '/jockBo/8dae',
    element: <JockBo8Page />,
    errorElement: <ErrorPage />,
  },
]);
