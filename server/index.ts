import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import dalleRoutes from './routes/dalle.routes.js'
import designRoutes from './routes/design.routes.js'
import { connect } from 'mongoose';
import { passport } from './auth/passport.js'
import session from 'express-session';
import cookieParser from 'cookie-parser'
const port = 8080;
dotenv.config()


const app = express()


connect('mongodb://127.0.0.1:27017/design_db').then(() => {
    console.log("Connected To design_db Database")
}).catch((e) => {
    console.error(e);
    process.exit(0)
});
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({ secret: "my_secretXF3", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json({ limit: "100mb" }))
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/design', designRoutes)



app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E" })
})


app.get('/api/v1/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/v1/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed
        res.send({ user: req.user })
    }
);
app.get('/api/v1/auth/github',
    passport.authenticate('github', { scope: ['user', 'user:email'] })
);

app.get('/api/v1/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed
        res.send({ user: req.user })
    }
);

app.listen(port, () => {
    console.log("Server Has Started on : " + port)
})


