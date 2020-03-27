const client = require('./db/sql-api-db');

//note that there are more examples here: https://github.com/Azure-Samples/azure-cosmos-db-sql-api-nodejs-getting-started/blob/master/app.js#L49
/**
 * Get all open items for a customer
 * @param {*} req 
 * @param {*} res 
 */
//TODO use id from auth token instead of email
function get(req, res, uid) {
  /*
  user = 'chris'
  if(req.params.user) {
    console.log('GREAT, GOT THE USER: ' + req.params.user);
    user = req.params.user;
  } else {
    console.log('NOT FINDING THE USER...');
  }
  */

  user = uid;
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.userId = @user',
    parameters: [
      {
        name: '@user',
        value: user
      }
    ]
  }
  client
  .database('shop')
  .container('items')
  .items.query(querySpec)
  .fetchAll()
  .then(results => {
    //console.log("GET IS FINE");
    res.json(results.resources);
  }).catch(error => console.log(error));
}

function getHistory(req, res, uid) {
  user = uid;
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.userId = @user',
    parameters: [
      {
        name: '@user',
        value: user
      }
    ]
  }
  client
  .database('shop')
  .container('recommendations')
  .items.query(querySpec)
  .fetchAll()
  .then(results => {
    console.log("hitory my friend");
    res.json(results.resources);
  }).catch(error => console.log(error));
}

function getCustomerData(req, res, uid) {
  user = uid;
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.userId = @user',
    parameters: [
      {
        name: '@user',
        value: user
      }
    ]
  }
  client
  .database('shop')
  .container('customers')
  .items.query(querySpec)
  .fetchAll()
  .then(results => {
    console.log("coco");
    res.json(results.resources);
  }).catch(error => console.log(error));
}

//This adds a new item to the DB
function upsert(req, res, uid) {
  client
  .database('shop')
  .container('items')
  .items.upsert(req.body).then(results => {
    console.log("UPSERT GOOD TO GO");
  }).catch(error=> console.log(error));
}

//This replaces a doc, think of it as an update
function replace(req, res, uid) {
  //console.log('IN REPLACE');
  //console.log(req.body);
  client
  .database('shop')
  .container('items')
  .item(req.body.id, req.body.user)
    .replace(req.body).then(results => {
      console.log("REPLACE GOOD TO GO");
    }).catch(error=> console.log(error));
}

function replaceCustomerData(req, res, uid) {
  console.log('IN REPLACE CUSTOMER');
  //console.log(req.body);
  //console.log(req.body[0].id);
  //console.log(req.body[0].user);
  client
  .database('shop')
  .container('customers')
  .item(req.body[0].id, req.body[0].user)
    .replace(req.body[0]).then(results => {
      console.log("REPLACE GOOD TO GO");
    }).catch(error=> console.log(error));
}

function upsertCustomerData(req, res, uid) {
  client
  .database('shop')
  .container('customers')
  .items.upsert(req.body).then(results => {
    console.log("UPSERT customer");
  }).catch(error=> console.log(error));
}
  
function destroy(req, res) {
  //console.log("DELETEING THIS ID:" + req.body.id);
  //console.log(req.body);
  client
  .database('shop')
  .container('items')
  .item(req.body.id, req.body.user)
  .delete(req.body)
  .then(results => {
    console.log("DELETE SUCCESS"); ///results
  })
  .catch(error=> console.log("DELETE ERROR" + error));
}

module.exports = { get, upsert, destroy, replace, getHistory, getCustomerData, upsertCustomerData, replaceCustomerData };