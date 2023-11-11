import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditEvent from './pages/EditEvent';
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import HomePage from './pages/HomePage';
import NewEvent, { action as newEventAction } from './pages/NewEvent';
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
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              { path: 'edit', element: <EditEvent /> },
            ],
          },
          { path: 'new', element: <NewEvent />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
