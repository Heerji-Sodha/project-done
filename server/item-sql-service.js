const Item = require('./item-model');
const ReadPreference = require('mongodb').ReadPreference;
//const ItemDao = require("./itemDao");

const { cosmosSqlApi } = require('./db/config');
const client = require('./db/sql-api-db');
const container = client.database(cosmosSqlApi.database.id).container(cosmosSqlApi.containers['usersContainer'].id);

//require('./mongo').connect();

function get(req, res) {
  //const docquery = Item.find({'status':'newrequest'}).read(ReadPreference.NEAREST);
  const docquery = Item.find({}).read(ReadPreference.NEAREST);
  docquery
      .exec()
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  
  //TODO I think this can go away...
  function create(req, res) {
    const { id, name, saying } = req.body;
    const item = new Item({ id, name, saying });
    item
      .save()
      .then(() => {
        res.json(item);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  
  function update(req, res) {
    const { _id, request, sources, status } = req.body;
    console.log(_id);
    console.log('finding...');
  
    Item.findById(_id)
      .then(item => {
        console.log('after find');
        console.log(item);
        item._id = _id;
        item.request = request;
        item.sources = sources;
        item.status = status;
        item.save().then(res.json(item));
    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });;
  }
  
  function destroy(req, res) {
    const { id } = req.params;
  
    Item.findOneAndRemove({ id })
      .then(item => {
        res.json(item);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

module.exports = { get, create, update, destroy };