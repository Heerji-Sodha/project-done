const firebase = require('firebase');
//const baseAPI = 'http://localhost:3001/api';
const baseAPI = 'https://shopr-list-api.azurewebsites.net/api';

const itemService = {

  getItemsForCustomer(customerId) {
      console.log("GETTING STUFF FOR CUSTOMER...");
      return new Promise((resolve, reject) => {
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
          
          fetch(`${baseAPI}/items/user`,  //fetch(`${baseAPI}/items/${customerId}`, 
          {
            method: 'GET',
            headers: {
              Authorization: "Bearer " + idToken
            }
          })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
              reject(err);
            });

        }).catch(function(error) {
          console.log("ERROR getting token! " + error);
        });  
      });
  },

  getShoppingHistoryForCustomer(customerId) {
    console.log("GETTING HITORONY FOR CUSTOMER..." + customerId);
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      fetch(`${baseAPI}/history/user`,  //fetch(`${baseAPI}/history/${customerId}`, 
      {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + idToken
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });  
    });
  },

  getCustomerData() {
    console.log("GETTING info FOR CUSTOMER...");
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      fetch(`${baseAPI}/customer/user`,  //fetch(`${baseAPI}/customer/${customerId}`, 
      {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + idToken
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });  
    });
  },

  upsert(item) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        fetch(`${baseAPI}/item`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + idToken
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });         
    });
  },

  replace(item) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        fetch(`${baseAPI}/item/replace`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + idToken
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });          
    });
  },

  replaceCustomerData(item) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {

        fetch(`${baseAPI}/customer/replace`, {
          method: 'POST',
          body: JSON.stringify(item),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + idToken
          }
        })
          .then(result => result.json())
          .then(json => resolve(json))
          .catch(err => {
            reject(err);
          });
      });
    });
  },

  upsertCustomerData(item) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {

      fetch(`${baseAPI}/customer/upsert`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + idToken
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });            
    });
  },  

  /*
  create(item) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/item`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + this.getTokenForAuth()
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
*/
/*
  update(item) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/item`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + this.getTokenForAuth()
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },*/

  destroy(item) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {

      fetch(`${baseAPI}/item/delete`, { 
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + idToken
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
          reject(err);
        });
      }).catch(function(error) {
        console.log("ERROR getting token! " + error);
      });           
    });
  }
};

export default itemService;
