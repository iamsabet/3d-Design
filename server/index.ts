import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import dalleRoutes from './routes/dalle.routes.js'
import designRoutes from './routes/design.routes.js'
import { connect } from 'mongoose';
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
app.use(express.json({ limit: "100mb" }))
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/design', designRoutes)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E" })
})

app.listen(port, () => {
    console.log("Server Has Started on : " + port)
})


