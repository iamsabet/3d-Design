import express from "express";
import DesignModel from "../models/design/index.ts";

const router = express.Router()

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from Design routes" });
})

router.route("/save").post((req, res) => {
    setTimeout(() => {
        const { model } = req.body;
        delete model.activeEditorTab
        const new_design = new DesignModel({ ...model })
        new_design.save().then(() => {
            res.status(200).json({ model_id: new_design.id, title: new_design.title });
        }).catch(e => {
            res.status(500).json({ message: e });
        })
    }, 1000)

})

export default router;