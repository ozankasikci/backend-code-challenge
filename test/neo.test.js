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
          // sandboxes lets concurrent testing without errors
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
        // sandboxes lets concurrent testing without errors
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
          // sandboxes lets concurrent testing without errors
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
});
