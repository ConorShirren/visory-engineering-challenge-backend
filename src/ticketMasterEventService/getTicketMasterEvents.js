const TICKETMASTER_API_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const { retrieveApiKey } = require('../utils/secretManager');
const { formatDate } = require('../utils/formatDate');

const getTicketMasterEvents = async (event) => {
  try {
    const apiKey = await retrieveApiKey();
    const { ticketmaster_api_key } = JSON.parse(apiKey);
    // Parsing incoming event data
    const { location, startDateTime, endDateTime } =
      event.queryStringParameters;

    const formattedStartDateTime = formatDate(startDateTime);
    const formattedEndtDateTime = formatDate(endDateTime);

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
    const url = `${TICKETMASTER_API_URL}?apikey=${ticketmaster_api_key}&countryCode=${location}&startDateTime=${formattedStartDateTime}&endDateTime=${formattedEndtDateTime}`;
    // Fetching events price from Ticketmaster API
    const response = await fetch(url);

    // Handling fetch errors
    if (response.status !== 200) {
      throw new Error('Failed to fetch events from ticketmaster');
    }

    // Parsing response data
    const data = await response.json();
    if (data._embedded === undefined) {
      return {
        statusCode: 204,
        body: JSON.stringify([]),
      };
    }
    const events = data._embedded.events;
    const mappedEvents = events.map((event) => {
      return {
        name: event.name,
        id: event.id,
        description: event.description,
        url: event.url,
        dates: {
          start: {
            localDate: event.dates.start.localDate,
            localTime: event.dates.start.localTime,
          },
          status: {
            code: event.dates.status.code,
          },
          timezone: event.dates.timezone,
        },
        classification: event.classifications[0]
          ? event.classifications[0].genre.name
          : 'N/A',
      };
    });

    // Returning success response
    return {
      statusCode: 200,
      body: JSON.stringify(mappedEvents),
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
