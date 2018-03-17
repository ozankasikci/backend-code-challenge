'use strict';

module.exports = {
  NasaApi: {
    failedToFetchNEORecords: new Error('Failed to fetch NEO records!'),
  },
  NEO: {
    failedToFetchHazardousRecords: new Error('Failed to fetch hazardous NEO records!'),
    failedToFetchFastestRecord: new Error('Failed to fetch fastest NEO record!'),
  },
};
