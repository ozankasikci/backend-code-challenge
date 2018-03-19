'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../server/server');
const errors = rootRequire('server/errors');

const { NEO } = app.models;

describe('NEO-Remote', function () {

  describe('#hazardous', function () {

    describe('when the request is valid', function () {
      it('should return 200 and fetch hazardous neo records', async function () {
        // sandboxes lets concurrent testing without errors
        const sandbox = sinon.sandbox.create();
        const someHazardousNEORecords = ['some hazardous records'];
        sandbox.stub(NEO, 'find').resolves(someHazardousNEORecords);

        const checkResBody = (res) => {
          expect(res.body).to.deep.equal(someHazardousNEORecords);
          sandbox.restore();
        };

        return await supertest(app)
          .get('/api/NEO/hazardous')
          .expect(200)
          .expect(checkResBody);
      });
    });

    describe('when the request is invalid', function () {
      it('should return 500 and fail to fetch hazardous records', async function () {
        const sandbox = sinon.sandbox.create();

        sandbox.stub(NEO, 'find').rejects(errors.NEO.failedToFetchHazardousRecords);

        return await supertest(app)
          .get('/api/NEO/hazardous')
          .expect(500)
          .expect(() => sandbox.restore());
      });
    });
  });


  describe('#fastest', function () {

    describe('when the request is valid', function () {
      it('should return 200 and fetch the fastest hazardous neo records', async function () {
        const sandbox = sinon.sandbox.create();
        const fastestSteroidEver = ['this is the fastest steroid ever'];

        sandbox.stub(NEO, 'find').resolves(fastestSteroidEver);

        const checkResBody = (res) => {
          expect(res.body).to.deep.equal(fastestSteroidEver);
          sandbox.restore();
        };

        return await supertest(app)
          .get('/api/NEO/fastest')
          .expect(200)
          .expect(checkResBody);
      });
    });

    describe('when the request is invalid', function () {
      it('should return 500 and fail to fetch fastest neo record', async function () {
        const sandbox = sinon.sandbox.create();

        sandbox.stub(NEO, 'find').rejects('sdf');

        await supertest(app)
          .get('/api/NEO/fastest')
          .expect(500);

        await supertest(app)
          .get('/api/NEO/fastest?hazardous=true')
          .expect(500);

        await supertest(app)
          .get('/api/NEO/fastest?hazardous=false')
          .expect(500);

        sandbox.restore();
      });
    });
  });


  describe('#bestYear', function () {

    describe('when the request is valid', function () {
      it('should return 200 and fetch the year with most neo records', async function () {
        const sandbox = sinon.sandbox.create();
        const bestYear = ['this is the best year with the most asteroids'];

        const mongodb = NEO.dataSource.connector.db;

        const cursorStub = { toArray: sandbox.stub().yields(null, bestYear) };
        const aggregationCallbacktub = sandbox.stub().yields(null, cursorStub);
        const aggregationStub = { aggregate: aggregationCallbacktub };

        sandbox.stub(mongodb, 'collection').returns(aggregationStub);

        const checkResBody = (res) => {
          expect(res.body).to.deep.equal(bestYear);
          sandbox.restore();
        };

        return await supertest(app)
          .get('/api/NEO/best-year')
          .expect(200)
          .expect(checkResBody);
      });
    });

    describe('when the request is invalid', function () {
      it('should return 500 and fail to fetch the best year for the neo records', async function () {
        const sandbox = sinon.sandbox.create();

        sandbox.stub(NEO, 'findBestPart').rejects(errors.NEO.failedToFetchTheBestYear);

        await supertest(app)
          .get('/api/NEO/best-year')
          .expect(500);

        await supertest(app)
          .get('/api/NEO/best-year?hazardous=true')
          .expect(500);

        await supertest(app)
          .get('/api/NEO/best-year?hazardous=false')
          .expect(500);

        sandbox.restore();
      });
    });


    describe('#bestMonth', function () {

      describe('when the request is valid', function () {
        it('should return 200 and fetch the month with most neo records', async function () {
          const sandbox = sinon.sandbox.create();
          const bestMonth = ['this is the best month with the most asteroids'];

          const mongodb = NEO.dataSource.connector.db;

          const cursorStub = { toArray: sandbox.stub().yields(null, bestMonth) };
          const aggregationCallbacktub = sandbox.stub().yields(null, cursorStub);
          const aggregationStub = { aggregate: aggregationCallbacktub };

          sandbox.stub(mongodb, 'collection').returns(aggregationStub);

          const checkResBody = (res) => {
            expect(res.body).to.deep.equal(bestMonth);
            sandbox.restore();
          };

          return await supertest(app)
            .get('/api/NEO/best-month')
            .expect(200)
            .expect(checkResBody);
        });
      });

      describe('when the request is invalid', function () {
        it('should return 500 and fail to fetch best month for neo records', async function () {
          const sandbox = sinon.sandbox.create();

          sandbox.stub(NEO, 'findBestPart').rejects(errors.NEO.failedToFetchTheBestMonth);

          await supertest(app)
            .get('/api/NEO/best-month')
            .expect(500);

          await supertest(app)
            .get('/api/NEO/best-month?hazardous=false')
            .expect(500);

          await supertest(app)
            .get('/api/NEO/best-month?hazardous=true')
            .expect(500);

          sandbox.restore();
        });
      });
    });
  });
});
