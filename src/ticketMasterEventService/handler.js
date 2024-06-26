const { getTicketMasterEvents } = require('./getTicketMasterEvents');

exports.handler = async (event) => {
  return await getTicketMasterEvents(event);
};
