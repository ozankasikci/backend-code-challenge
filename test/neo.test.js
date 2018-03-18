'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../server/server');
const errors = rootRequire('server/errors');

const { NEO } = app.models;

describe('NEO', function () {

  describe('#hazardous', function () {

    describe('when the request is valid', function () {
      it('should be able fetch hazardous neo records', async function () {
        // sandboxes lets concurrent testing without errors
        const sandbox = sinon.sandbox.create();
        const someHazardousNEORecords = ['some hazardous records'];
        sandbox.stub(NEO, 'find').resolves(someHazardousNEORecords);
        const res = await NEO.hazardous();

        expect(res).to.deep.equal(someHazardousNEORecords);
        sandbox.restore();
      });
    });

    describe('when the request is invalid', function () {
      it('should fail to fetch hazardous records', async function () {
        const sandbox = sinon.sandbox.create();

        try {
          sandbox.stub(NEO, 'find').rejects(errors.NEO.failedToFetchHazardousRecords);
          const res = await NEO.hazardous();
          expect(res).to.not.exist();
        }

        catch (e) {
          expect(e).to.equal(errors.NEO.failedToFetchHazardousRecords);
          sandbox.restore();
        }
        sandbox.restore();
      });
    });
  });


  describe('#fastest', function () {

    describe('when the request is valid', function () {
      it('should be able fetch the fastest hazardous neo records', async function () {
        const sandbox = sinon.sandbox.create();
        const fastestSteroidEver = ['this is the fastest steroid ever'];

        sandbox.stub(NEO, 'find').resolves(fastestSteroidEver);
        const res = await NEO.fastest();

        expect(res).to.deep.equal(fastestSteroidEver);
        sandbox.restore();
      });
    });

    describe('when the request is invalid', function () {
      it('should fail to fetch fastest neo record', async function () {
        const sandbox = sinon.sandbox.create();

        try {
          sandbox.stub(NEO, 'find').rejects(errors.NEO.failedToFetchFastestRecord);
          const res = await NEO.hazardous();
          expect(res).to.not.exist();
        }

        catch (e) {
          expect(e).to.equal(errors.NEO.failedToFetchFastestRecord);
          sandbox.restore();
        }
        sandbox.restore();
      });
    });
  });


  describe('#bestYear', function () {

    describe('when the request is valid', function () {
      it('should be able fetch the year with most neo records', async function () {
        const sandbox = sinon.sandbox.create();
        const bestYear = ['this is the best year with the most asteroids'];

        const mongodb = NEO.dataSource.connector.db;

        const cursorStub = { toArray: sandbox.stub().yields(null, bestYear) };
        const aggregationCallbacktub = sandbox.stub().yields(null, cursorStub);
        const aggregationStub = { aggregate: aggregationCallbacktub };

        sandbox.stub(mongodb, 'collection').returns(aggregationStub);
        const res = await NEO.bestYear();

        expect(res).to.deep.equal(bestYear);
        sandbox.restore();
      });
    });

    describe('when the request is invalid', function () {
      it('should fail to fetch the best year for the neo records', async function () {
        const sandbox = sinon.sandbox.create();

        try {
          sandbox.stub(NEO, 'bestYear').rejects(errors.NEO.failedToFetchTheBestYear);
          const res = await NEO.bestYear();
          expect(res).to.not.exist();
        }

        catch (e) {
          expect(e).to.equal(errors.NEO.failedToFetchTheBestYear);
          sandbox.restore();
        }
        sandbox.restore();
      });
    });


    describe('#bestMonth', function () {

      describe('when the request is valid', function () {
        it('should be able fetch the month with most neo records', async function () {
          const sandbox = sinon.sandbox.create();
          const bestYear = ['this is the best year with the most asteroids'];

          const mongodb = NEO.dataSource.connector.db;

          const cursorStub = { toArray: sandbox.stub().yields(null, bestYear) };
          const aggregationCallbacktub = sandbox.stub().yields(null, cursorStub);
          const aggregationStub = { aggregate: aggregationCallbacktub };

          sandbox.stub(mongodb, 'collection').returns(aggregationStub);
          const res = await NEO.bestMonth();

          expect(res).to.deep.equal(bestYear);
          sandbox.restore();
        });
      });

      describe('when the request is invalid', function () {
        it('should fail to fetch best month for neo records', async function () {
          const sandbox = sinon.sandbox.create();

          try {
            sandbox.stub(NEO, 'bestMonth').rejects(errors.NEO.failedToFetchTheBestMonth);
            const res = await NEO.bestMonth();
            expect(res).to.not.exist();
          }

          catch (e) {
            expect(e).to.equal(errors.NEO.failedToFetchTheBestMonth);
            sandbox.restore();
          }
          sandbox.restore();
        });
      });
    });
  });
});
