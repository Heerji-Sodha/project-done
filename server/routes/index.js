const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var serviceAccount = require("../auth/shopr-5e75c-firebase-adminsdk-3a7uh-fab07dd04e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopr-5e75c.firebaseio.com"
});

//const heroesService = require('../hero-service');
const itemsService = require('../item-service')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Origin", "https://shopr-list-web.azurewebsites.net");
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/heartbeat', (req, res) => {
  res.status(200).send({ message: "beat" });
});

/** Items */ //TODO don't reall need the query param
router.get('/items/:user', (req, res) => {
  console.log("/items/user");
  const authHeader = req.header("Authorization").split(" ")[1];

  //console.log(authHeader);
  // idToken comes from the client app
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    
    let uid = decodedToken.uid;
    //console.log("decoded:" + decodedToken.uid);
    //TODO if there is nothing there, send back an error!
    itemsService.get(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

router.get('/history/:user', (req, res) => {
  console.log("/history/user");

  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.getHistory(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

/*
router.put('/item', (req, res) => {
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.upsert(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
  });
});
*/

router.post('/item/replace', (req, res) => {
  console.log("/item/replace");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.replace(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

router.post('/customer/replace', (req, res) => {
  console.log("/customer/replace");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.replaceCustomerData(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
  });
});

router.post('/customer/upsert', (req, res) => {
  console.log("/customer/upsert");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.upsertCustomerData(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

router.get('/customer/:user', (req, res) => {
  console.log("/customer/user");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.getCustomerData(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

router.post('/item', (req, res) => {
  console.log("/item");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.upsert(req, res, uid);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

/*
router.delete('/item/:id', (req, res) => {
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.destroy(req, res);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});
*/
router.post('/item/delete', (req, res) => {
  console.log("/item/delete");
  const authHeader = req.header("Authorization").split(" ")[1];
  admin.auth().verifyIdToken(authHeader)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    itemsService.destroy(req, res);
  }).catch(function(error) {
    console.log("ERR");
    console.log(error);
    res.status(401).send({ error: "invalid token" });
  });
});

module.exports = router;
