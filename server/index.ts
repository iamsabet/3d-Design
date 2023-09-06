import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import dalleRoutes from './routes/dalle.routes.ts'
import designRoutes from './routes/design.routes.ts'
import profileRoutes from './routes/profile.routes.ts'
import { connect } from 'mongoose';
import { passport } from './auth/passport.ts'
import session from 'express-session';
import cookieParser from 'cookie-parser'
import IUser from './models/user/types.ts'
import UserModel from './models/user/user.ts'
import authMiddleware from './middlewares/auth.middleware.ts'
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
app.use('/api/v1/profile', authMiddleware, profileRoutes)



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
        // @ts-ignore
        const token = req.user?.access_token
        res.redirect("http://localhost:5173/auth/callback?token=" + token)
    }
);
app.get('/api/v1/auth/github',
    passport.authenticate('github', { scope: ['user', 'user:email'] })
);

app.get('/api/v1/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        // Successful authentication, redirect or respond as needed

        const githubUser = req.user as any
        // @ts-ignore
        const token = req.user?.access_token
        const newUser: IUser = {
            id: githubUser.id.toString(),
            accessToken: token,
            username: githubUser.login,
            name: githubUser.name,
            fullName: githubUser.fullName,
            profilePic: githubUser.avatar_url,
            email: githubUser.email,
            type: "github"
        }
        try {
            const result = await UserModel.findOneAndUpdate({ id: githubUser.id.toString() }, { ...newUser }, { new: true, upsert: true })
            if (result) {
                res.redirect("http://localhost:5173/auth/callback?token=" + result.accessToken)
            }
            else {
                res.send({ result: false, message: "Signed-In Failed" })
            }
        }
        catch (e) {
            res.send({ result: false, message: JSON.stringify(e) })
        }
    }
);

app.listen(port, () => {
    console.log("Server Has Started on : " + port)
})


