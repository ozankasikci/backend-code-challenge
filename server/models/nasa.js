'use strict';
const NasaApi = rootRequire('server/modules/nasa-api');
const _ = require('lodash');

module.exports = function(Nasa) {

  Nasa.saveNEORecordsInRange = (startDate, finishDate) => {
    const { NEO } = Nasa.app.models;
    let response;

    const fetchNEORecords = () => {
      return NasaApi.fetchNEORecordsInRange(startDate, finishDate)
        .then(res => response = res);
    };

    const saveNEORecords = () => {
      const nearEarthObjects = [];
      const { near_earth_objects } = response;
      _.forEach(near_earth_objects, (dateGroup, date) => {

        dateGroup.forEach(neo => {
          const speed = _.get(neo, 'close_approach_data[0].relative_velocity.kilometers_per_hour');
          const neoObject = {
            date,
            reference: neo.neo_reference_id,
            name: neo.name,
            speed,
            isHazardous: neo.is_potentially_hazardous_asteroid,
          };

          nearEarthObjects.push(neoObject);
        });
      });

      return NEO.create(nearEarthObjects);
    };

    return fetchNEORecords()
      .then(saveNEORecords);
  };

  Nasa.remoteMethod('saveNEORecordsInRange', {
    http: {path: '/saveNEORecordsInRange', verb: 'get', status: 200},
    accepts: [
      { arg: 'startDate',
        type: 'string',
        description: 'Start Date',
        required: true,
        http: {source: 'query'},
      },
      {
        arg: 'finishDate',
        type: 'string',
        description: 'Finish Date',
        required: true,
        http: {source: 'query'},
      },
    ],
    returns: {root: true, type: 'object'},
  });
};
