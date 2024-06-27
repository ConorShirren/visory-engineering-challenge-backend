import { getTicketMasterEvents } from './getTicketMasterEvents';

exports.handler = async (event) => {
  return await getTicketMasterEvents(event);
};
