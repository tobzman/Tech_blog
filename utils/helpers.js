// Format a date as "Month Day, Year"
const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Truncate a string to a specified length
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

module.exports = { formatDate, truncateText };
