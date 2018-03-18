'use strict';

module.exports = function(NEO) {

  NEO.hazardous = () => {
    const filter = { where: { isHazardous: true } };
    return NEO.find(filter);
  };

  NEO.fastest = (hazardous = false) => {
    const filter = {
      where: { isHazardous: hazardous },
      order: 'speed DESC',
      limit: 1,
    };

    return NEO.find(filter);
  };

  NEO.bestYear = (hazardous = false) => {
    return NEO.findBestPart('year', hazardous);
  };

  NEO.bestMonth = (hazardous = false) => {
    return NEO.findBestPart('month', hazardous);
  };

  // generic function to be able fetch best month, year, day etc.
  // previous methods was simple enough for loopback handle
  // here we need to grab the mongodb client and apply aggregation.
  NEO.findBestPart = (datePart, hazardous) => {
    const mongodb = NEO.dataSource.connector.db;

    const pipeline = [
      { $match: { 'isHazardous': hazardous } },
      {
        $group: {
          _id: { [datePart]: { [`$${datePart}`]: '$date' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ];

    return new Promise((resolve, reject) => {
      const arrayFromCursor = (err, cursor) => {
        if (err) {
          return reject(err);
        }

        cursor.toArray(function (err, documents) {
          resolve(documents);
        });
      };

      mongodb.collection('NEO').aggregate(pipeline, arrayFromCursor);
    });
  };

  NEO.remoteMethod('hazardous', {
    http: { path: '/hazardous', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
    description: 'Fetches hazardous near earth objects.',
  });

  NEO.remoteMethod('fastest', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/fastest', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
    description: 'Fetches fastest near earth objects.',
  });

  NEO.remoteMethod('bestYear', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/best-year', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
    description: 'Fetches the year with most near earth objects.',
  });

  NEO.remoteMethod('bestMonth', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/best-month', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
    description: 'Fetches the monthwith most near earth objects.',
  });
};
