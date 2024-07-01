const formatDate = (date) => {
  return new Date(date).toISOString().split('.')[0] + 'Z';
};
module.exports = { formatDate };
