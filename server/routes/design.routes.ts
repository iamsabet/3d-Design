import express from "express";
import DesignModel from "../models/design/design.ts";

let paginateOptions = {
    page: 1,
    limit: 6,

    sort: {
        updatedAt: -1
    },
    collation: {
        locale: 'en',
    },
};

const router = express.Router()

router.route("/paginate").get((req, res) => {
    if (req.query && req.query.page) {
        paginateOptions.page = parseInt(req.query.page as string)
    }
    // setTimeout(() => {
    DesignModel.paginate({}, paginateOptions).then((result) => {
        res.status(200).json(result);
    }).catch(e => {
        res.status(500).json({ message: e });
    })
    // }, 1000)

})

router.route("/save").post((req, res) => {
    // setTimeout(() => {
    const { model } = req.body;
    delete model.activeEditorTab
    const new_design = new DesignModel({ ...model })
    new_design.save().then(() => {
        res.status(200).json({ model_id: new_design.id, title: new_design.title });
    }).catch(e => {
        res.status(500).json({ message: e });
    })
    // }, 1000)

})

export default router;