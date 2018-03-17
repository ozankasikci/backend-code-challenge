'use strict';

const { expect } = require('chai');
const app = require('../server/server');
const errors = rootRequire('server/errors');

const { Nasa, NEO } = app.models;

describe('Nasa', function () {

  describe('#saveNEORecordsInRange', function () {

    describe('when the request is valid', function () {

      it('should be able save fetched neo records', async function () {
        const records = await Nasa.saveNEORecordsInRange('2018-03-14', '2018-03-17');
        const recordIds = records.map(r => r.id);

        const neoFilter = { where: { id: { inq: recordIds } } };
        const neoRecords = await NEO.find(neoFilter);

        expect(neoRecords.length).to.equal(recordIds.length);
      });
    });

    describe('when the request is invalid', function () {

      it('should fail to fetch and record neo data when the dates are null', async function () {
        try {
          await Nasa.saveNEORecordsInRange(null, null);
        }

        catch (e) {
          expect(e).to.equal(errors.NasaApi.failedToFetchNEORecords);
        }
      });
    });
  });
});
