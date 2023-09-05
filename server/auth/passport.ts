


import OAuth2Strategy, { InternalOAuthError } from 'passport-oauth2'
import axios from 'axios'
import passport from 'passport'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, } from '../options.js'
// console.log(GOOGLE_CLIENT_ID);
// console.log(GOOGLE_CLIENT_SECRET)
// console.log(GOOGLE_CLIENT_ID);

const googleClient = new OAuth2Strategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth', // The Google OAuth 2.0 authorization URL
    tokenURL: 'https://accounts.google.com/o/oauth2/token', // The Google OAuth 2.0 token URL
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback', // The callback URL for your application
}, async (accessToken: string, refreshToken: string, params: any, profile: object, done: any) => {
    // console.warn(accessToken);
    // console.warn(profile);
    // Callback function to handle user data after authentication
    // You can use 'profile' to access user information returned by Google
    // You can also save user data in your database or perform other actions here
    try {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        profile = data;
        // console.warn(profile);
        return done(null, profile);
    } catch (error) {
        return done(error);
    }

})



const githubClient = new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/github/callback', // The callback URL for your application
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    // console.warn(accessToken);
    // console.warn(profile);
    // Callback function to handle user data after authentication
    // You can use 'profile' to access user information returned by Github
    // You can also save user data in your database or perform other actions here
    try {
        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });
        profile = data;
        return done(null, profile);
    } catch (error) {
        return done(error);
    }
})



passport.use('google', googleClient);
passport.use('github', githubClient);


passport.serializeUser((profile, done) => {
    // Serialize user data to store in the session
    done(null, profile);
});

passport.deserializeUser((profile: any, done) => {
    // Deserialize user data from the session
    done(null, profile);
})

export { passport }