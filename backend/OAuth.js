const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests

async function getUserData(access_token) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log("User data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

router.get('/', async function(req, res, next) {
  const code = req.query.code;
  
  try {
    const redirectUrl = 'http://127.0.0.1:3001/oauth';
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // Exchange authorization code for tokens
    const tokenResponse = await oAuth2Client.getToken(code);
    const tokens = tokenResponse.tokens;

    // Set tokens in OAuth2Client instance
    oAuth2Client.setCredentials(tokens);

    console.log("Tokens acquired:", tokens);

    // Fetch user data using access token
    const userData = await getUserData(tokens.access_token);
    res.json(userData);
  } catch (error) {
    console.error("Error with signing in with Google:", error);
    res.status(500).json({ error: "Failed to sign in with Google" });
  }
});

module.exports = router;
