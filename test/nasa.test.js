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

        // ensure returned records are of NEO type
        records.every(r => expect(r).to.be.an.instanceOf(NEO));
        records.every(r => expect(r).to.have.property('date'));
        records.every(r => expect(r).to.have.property('name'));
        records.every(r => expect(r).to.have.property('speed'));
        records.every(r => expect(r).to.have.property('reference'));
        records.every(r => expect(r).to.have.property('reference'));
        records.every(r => expect(r).to.have.property('isHazardous'));

        // fetch neo records from db
        const recordIds = records.map(r => r.id);
        const neoFilter = { where: { id: { inq: recordIds } } };
        const neoRecords = await NEO.find(neoFilter);

        // expect all records to be saved in the database
        expect(neoRecords.length).to.equal(recordIds.length);
      });
    });


    describe('when the request is invalid', function () {
      it('should fail to fetch and record neo data when the dates are null', async function () {
        try {
          await Nasa.saveNEORecordsInRange(null, null);
        }

        catch (e) {
          const expectedError = errors.Generic.missingParameter('start date, finish date');
          expect(e).to.be.an('error').that.has.property('message', expectedError.message);
        }
      });

      it('should fail to fetch and record neo data when the dates are invalid type', async function () {
        try {
          await Nasa.saveNEORecordsInRange('123456', 123456);
        }

        catch (e) {
          const expectedError = errors.NasaApi.failedToFetchNEORecords;
          expect(e).to.be.an('error').that.has.property('message', expectedError.message);
        }
      });
    });
  });
});
