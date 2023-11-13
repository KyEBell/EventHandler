import { useRouteLoaderData, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import { Suspense } from 'react';
import EventsList from '../components/EventsList';

function EventDetail() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetail;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
  console.log('response', response);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could Not Fetch Details For Selected Event' }),
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could Not Delete Event' }), {
      status: 500,
    });
  } else {
    return redirect('/events');
  }
}
