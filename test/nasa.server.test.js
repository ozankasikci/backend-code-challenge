'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../server/server');

describe('Nasa-Remote', function () {

  describe('#saveNEORecordsInRange', function () {

    describe('when the request is valid', function () {
      it('should return 200 and save fetched neo records', async function () {
        const checkResBody = (res) => {
          const records = res.body;

          // ensure returned records are of NEO type
          records.every(r => expect(r).to.have.property('date'));
          records.every(r => expect(r).to.have.property('name'));
          records.every(r => expect(r).to.have.property('speed'));
          records.every(r => expect(r).to.have.property('reference'));
          records.every(r => expect(r).to.have.property('reference'));
          records.every(r => expect(r).to.have.property('isHazardous'));
        };

        const query = '?startDate=2018-03-14&finishDate=2018-03-17';
        return await supertest(app)
          .post(`/api/Nasa/saveNEORecordsInRange${query}`)
          .expect(200)
          .expect(checkResBody);
      });
    });


    describe('when the request is invalid', function () {
      it('should fail with 400 when the dates are null', async function () {
        const query = '?startDate=&finishDate=';
        return await supertest(app)
          .post(`/api/Nasa/saveNEORecordsInRange${query}`)
          .expect(400);
      });

      it('should fail with 500 dates are invalid type', async function () {
        const query = '?startDate=123456&finishDate=asdfg';
        return await supertest(app)
          .post(`/api/Nasa/saveNEORecordsInRange${query}`)
          .expect(500);
      });
    });
  });
});
