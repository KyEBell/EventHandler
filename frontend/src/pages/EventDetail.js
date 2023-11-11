import { useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetail() {
  const data = useRouteLoaderData('event-detail');

  return <EventItem event={data.event} />;
}

export default EventDetail;

export async function loader({ request, params }) {
  const id = params.id;

  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could Not Fetch Details For Selected Event' }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const eventId = params.id;
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
