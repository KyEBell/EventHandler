import EventsList from '../components/EventsList';
import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could Not Fetch Events' }), {
      status: 500,
    });
    //can do the below instead of the above.
    // throw json({ message: 'Could Not Fetch Events' }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
}
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
