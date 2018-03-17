'use strict';
const axios = require('axios');

const NASA_BASE_URL = 'https://api.nasa.gov/';
const NASA_NEO_ENDPOINT = `${NASA_BASE_URL}neo/rest/v1/feed`;
const NASA_API_KEY = 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD';

const fetchNEORecordsInRange = (startDate, finishDate) => {
  const queryParams = `start_date=${startDate}&finish_date=${finishDate}` +
    `&api_key=${NASA_API_KEY}`;

  const url = `${NASA_NEO_ENDPOINT}?${queryParams}`;

  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject('Failed to fetch NEO records!'));
};

module.exports = {
  fetchNEORecordsInRange,
};
