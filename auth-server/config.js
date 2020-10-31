//We add this to .gitignore, so we don't push it to github (sensitive data)
//This is the MongoDB server URL to connect to the Mongodb Atlas (this contains a password to the DB, so thats why we keep it here, and link it to the server.js file.)
module.exports = {
  MONGODB_URI:
    "mongodb+srv://mrcll:yk67t9AagGSKOU2b@cluster0.kfmcv.mongodb.net/mixandmatch?retryWrites=true&w=majority",
  SECRET_KEY: "some very secret key",
  client_id: "1a7725c0d63742b99d770b299450e4e8", // Your client id
  client_secret: "29b6678e34f34425954efbb4d83bca43", // Your secret
};
