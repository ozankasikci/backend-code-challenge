'use strict';

const { expect } = require('chai');
const app = require('../server/server');

const { Nasa, NEO } = app.models;

describe('Nasa', function () {

  describe('#saveNEORecordsInRange', function () {

    it('should be able save fetched neo records', async function () {
      const records = await Nasa.saveNEORecordsInRange('2018-03-14', '2018-03-17');
      const recordIds = records.map(r => r.id);

      const neoFilter = { where: { id: { inq: recordIds } } };
      const neoRecords = await NEO.find(neoFilter);

      expect(neoRecords.length).to.equal(recordIds.length);
    });
  });
});
