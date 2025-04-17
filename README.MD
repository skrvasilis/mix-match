# 🎧 Mix & Match

Mix & Match is a project built with Node.js, Express, React, and the Spotify Web API. It connects music lovers by analyzing their top Spotify artists and genres, and then matching them with others who share similar music tastes.

## 🚀 Live Demo

- **Client:** [https://mix-match-xi.vercel.app/](https://mix-match-xi.vercel.app/)
- **Server:** [https://mixandmatchserver.onrender.com](https://mixandmatchserver.onrender.com)

> ⚠️ Currently, only users registered in the Spotify developer dashboard can log in. Production access is in progress.

## 🧠 Features

- Spotify OAuth authentication
- Fetch top artists and genres via Spotify Web API
- Save artist and genre data to MongoDB
- Compare music tastes between users
- Match users with similar music profiles
- JWT token-based authentication
- Fully deployed on Render and Vercel

## 💡 Tech Stack

**Frontend**  
- React.js  

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Passport.js (Spotify strategy)  
- JWT (JSON Web Tokens)  


## Setup & Run Locally

1. Clone the repository  

2. Set up environment variables  
   - For the client: `VITE_BACKEND_URL`  
   - For the server: `CLIENT_URL`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_SECRET`, `JWT_SECRET`

3. Run the client  
   `npm install && npm start`

4. Run the server  
   `npm install && npm start`
