'use strict';

const { expect } = require('chai');
const app = require('../server/server');
const NasaApi = rootRequire('server/modules/nasa-api');
const errors = rootRequire('server/errors');

const { Nasa } = app.models;

describe('NasaApi', function () {

  describe('#fetchNEORecordsInRange', function () {

    describe('when the request is valid', function () {

      it('should be able save fetched neo records', async function () {
        const records = await NasaApi.fetchNEORecordsInRange('2018-03-14', '2018-03-17');
        expect(records).to.be.an('object');
        expect(records).to.have.property('element_count');
      });
    });

    describe('when the request is invalid', function () {

      it('should fail to fetch and record neo data when the dates are null', async function () {
        try {
          await NasaApi.fetchNEORecordsInRange(null, null);
        }

        catch (e) {
          expect(e).to.equal(errors.NasaApi.failedToFetchNEORecords);
        }
      });
    });
  });
});
