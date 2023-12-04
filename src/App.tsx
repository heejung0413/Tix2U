import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/layouts/PageLayout';
import ConcertPage from '@/pages/concert/page';
import DancingPage from '@/pages/dancing/page';
import DetailPage from '@/pages/detail/[id]/page';
import EntirePage from '@/pages/entire/page';
import FindIDPage from '@/pages/login/find/page';
import LoginPage from '@/pages/login/page';
import MusicalPage from '@/pages/musical/page';
import IndexPage from '@/pages/page';
import TheaterPage from '@/pages/theater/page';

import theme from '@/styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'detail/:mt20id',
        element: <DetailPage />,
      },
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: 'find',
            element: <FindIDPage />,
          },
        ],
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'concert',
        element: <ConcertPage />,
      },
      {
        path: 'musical',
        element: <MusicalPage />,
      },
      {
        path: 'dancing',
        element: <DancingPage />,
      },
      {
        path: 'theater',
        element: <TheaterPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
