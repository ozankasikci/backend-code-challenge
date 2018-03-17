'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  const helloWorld = (req, res) => res.json({ 'hello': 'world!'});
  router.get('/', helloWorld);
  server.use(router);
};
