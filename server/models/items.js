const _ = require("lodash");
const client = require('../db/sql-api-db');
const { cosmosSqlApi } = require('../db/config');
const container = client.database(cosmosSqlApi.database.id).container(cosmosSqlApi.containers['usersContainer'].id);
//const schemas = require('../schemas');
//const { userSchema } = schemas;

class User {
  constructor(data) {
    //this.data = this.sanitize(data);
  }

  sanitize(data = {}) {
    //schema = userSchema;
    //return _.pick(_.defaults(data, schema), _.keys(schema));
  }

  async save() {

  }

  // static methods used at the class level
  static async find() {
    // query to return all items
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.user = @user',
      parameters: [
        {
          name: '@country',
          value: 'chris'
        }
      ]
    }

    const { resources: results } = await container.items.query(querySpec).fetchAll();
    console.log("QUERY BERYY");
    console.log(results);
    return results;
  }

  static async findById() {
    // implement find
  }
}

module.exports = User;