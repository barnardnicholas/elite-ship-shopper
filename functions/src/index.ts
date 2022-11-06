import * as functions from 'firebase-functions';
import fetchShoppingList from './controllers/search';

exports.test = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send(`The body is equal to '${JSON.stringify(request.body)}'`);
});
// http://localhost:5001/elite-ship-shopper/us-central1/test
// http://elite-ship-shopper.web.app/elite-ship-shopper/us-central1/test

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.search = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    response.status(400).send('Bad request');
  }

  const {
    modules = [],
    range = 20,
    startCoords = { x: 0, y: 0, z: 0 },
    liveFetch = false,
  } = request.body;

  fetchShoppingList({ modules, range, startCoords, liveFetch })
    .then(responseData => {
      response.status(200).send(responseData);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error);
    });
});
// http://localhost:5001/elite-ship-shopper/us-central1/search
// http://elite-ship-shopper.web.app/elite-ship-shopper/us-central1/search
