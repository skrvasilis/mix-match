const { env } = process;
const config = {
  env: env.NODE_ENV,
};

//We add this to .gitignore, so we don't push it to github (sensitive data)
//This is the MongoDB server URL to connect to the Mongodb Atlas (this contains a password to the DB, so thats why we keep it here, and link it to the server.js file.)
module.exports = {
  MONGODB_URI: env.MIX_AND_MATCH_DB,
  SPOTIFY_CLIENT_ID: env.SPOTIFY_CLIENT_ID, // Your client id
  SPOTIFY_SECRET: env.SPOTIFY_SECRET, // Your secret
};
