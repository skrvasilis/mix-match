const { env } = process;
const config = {
  env: env.NODE_ENV,
};


module.exports = {
  MONGODB_URI: env.MIX_AND_MATCH_DB,
  SPOTIFY_CLIENT_ID: env.SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET: env.SPOTIFY_SECRET, 
  JWT_SECRET: env.JWT_SECRET
};
