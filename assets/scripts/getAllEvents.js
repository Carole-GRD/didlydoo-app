
// import { displayEvents } from "./displayEvents.js";
const url = 'http://localhost:3000/api/';

export async function getAllEvents() {

    // ALL EVENTS
    // const eventsResponse = await fetch(`${url}events/`);
    const eventsResponse = await fetch(`http://localhost:3000/api/events/`);
    const eventsJson = await eventsResponse.json();
    // console.log('All events : ', eventsJson);

    return eventsJson;

}
