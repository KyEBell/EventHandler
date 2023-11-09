import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditEvent from './pages/EditEvent';
import EventDetail from './pages/EventDetail';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import NewEvent from './pages/NewEvent';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import EventsRootLayout from './pages/EventsRoot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: ':id', element: <EventDetail /> },
          { path: 'new', element: <NewEvent /> },
          { path: ':id/edit', element: <EditEvent /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
