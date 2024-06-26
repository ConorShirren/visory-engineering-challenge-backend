const TICKETMASTER_API_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const { retrieveApiKey } = require('../utils/secretManager');

const getTicketMasterEvents = async (event) => {
  try {
    const apiKey = await retrieveApiKey();
    // Parsing incoming event data
    const { location, startDateTime, endDateTime } =
      event.queryStringParameters;

    // Input validation
    if (!location) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'location is required.',
        }),
      };
    }

    // Constructing URL for CoinGecko API
    const url = `${TICKETMASTER_API_URL}?apiKey=${apiKey}&countryCode=${location}&startDateTime=${startDateTime}&endDateTime${endDateTime}`;

    // Fetching events price from Ticketmaster API
    const response = await fetch(url);

    // Handling fetch errors
    if (!response.ok) {
      throw new Error('Failed to fetch events from ticketmaster');
    }

    // Parsing response data
    const data = await response.json();
    const events = data._embedded.events;

    // Returning success response
    return {
      statusCode: 200,
      body: events,
    };
  } catch (error) {
    // Logging and returning error response
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { getTicketMasterEvents };
