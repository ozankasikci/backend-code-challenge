'use strict';

const pify = require('pify');

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
  });

  NEO.remoteMethod('fastest', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/fastest', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
  });

  NEO.remoteMethod('bestYear', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/best-year', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
  });

  NEO.remoteMethod('bestMonth', {
    accepts: [
      { arg: 'hazardous', type: 'boolean', default: false, http: { source: 'query' } },
    ],
    http: { path: '/best-month', verb: 'get', status: 200 },
    returns: { root: true, type: 'object' },
  });
};
