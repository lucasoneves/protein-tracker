import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const CLIENT_ID = '256526142796-s4pl16jv8cqqont1415a39fnt9f0o114.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    const tokenData = await tokenResponse.json();
    const { access_token, id_token } = tokenData;

    // Use access_token or id_token to fetch user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await profileResponse.json();

    // Code to handle user authentication and retrieval using the profile data

    res.redirect('/');
  } catch (error) {
    console.error('Error:', error);
    res.redirect('/login');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Code to handle user logout
  res.redirect('/login');
});

export default router;
