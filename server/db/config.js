
module.exports = {
    cosmosSqlApi: {
      endpoint: 'https://shopsql.documents.azure.com:443/',
      primaryKey: 'JvSPV7UAKAqAHWgSlIHFgVb3DXAC3ySBaU8gp4tGoHQE0k1IxoDTYCbvJUCTx8XF367ZEr8PKKmLh0eAJjgM3A==',
      database: {
        id: 'shop'
      },
      containers: {
        usersContainer: {
          id: 'items',
          partitionKey: { kind: 'Hash', paths: ['/user'] }
        }
      }
    },
  };
  
  