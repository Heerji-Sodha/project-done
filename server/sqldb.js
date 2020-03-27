const config = {};

config.host = process.env.HOST || "https://shopsql.documents.azure.com:443/";
config.authKey =
  process.env.AUTH_KEY || "JvSPV7UAKAqAHWgSlIHFgVb3DXAC3ySBaU8gp4tGoHQE0k1IxoDTYCbvJUCTx8XF367ZEr8PKKmLh0eAJjgM3A==";
config.databaseId = "shop";
config.containerId = "items";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;