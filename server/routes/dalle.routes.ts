import express from 'express'
import * as dotenv from 'dotenv'

import { Configuration, OpenAIApi } from 'openai'
import authMiddleWare from '../middlewares/auth.middleware.ts'

dotenv.config()

const router = express.Router()

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E routes" });
})

router.route("/").post(authMiddleWare, async (req, res) => {
    try {
        const { prompt } = req.body
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })
        const image = response.data.data[0].b64_json

        res.status(200).json({ photo: image })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: JSON.stringify(e) })
    }
})

export default router
