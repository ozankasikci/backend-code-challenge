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
      const { near_earth_objects } = response;

      // collect near earch object to be saved
      const nearEarthObjects = [];
      _.forEach(near_earth_objects, (dateGroup, date) => {

        dateGroup.forEach(neo => {
          // this variable looks like it might cause undefined errors
          // better getting it using lodash.get
          const speed = _.get(neo, 'close_approach_data[0].relative_velocity.kilometers_per_hour');

          const neoObject = {
            date,
            speed,
            name: neo.name,
            reference: neo.neo_reference_id,
            isHazardous: neo.is_potentially_hazardous_asteroid,
          };

          nearEarthObjects.push(neoObject);
        });
      });

      // bulk insert them
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
