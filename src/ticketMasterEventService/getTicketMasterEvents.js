const TICKETMASTER_API_URL =
  'https://app.ticketmaster.com/discovery/v2/events?apikey=JJmex3yw0A2XltAAH8mGG8NN6htWhZjG&locale=*';

const getTicketMasterEvents = async (event) => {
  try {
    // Parsing incoming event data
    const { location } = JSON.parse(event.body);

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
    const url = `${TICKETMASTER_API_URL}`;

    // Fetching events price from Ticketmaster API
    // const response = await fetch(url);

    // // Handling fetch errors
    // if (!response.ok) {
    //   throw new Error('Failed to fetch events from ticketmaster');
    // }

    // // Parsing response data
    // const data = await response.json();

    // Validating response

    // Parse and return repsonse

    // Returning success response
    return {
      statusCode: 200,
      body: location,
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
