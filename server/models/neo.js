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
    const filter = {
      where: { isHazardous: hazardous },
      order: 'speed DESC',
      limit: 1,
    };

    return NOE.find(filter);
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
};
