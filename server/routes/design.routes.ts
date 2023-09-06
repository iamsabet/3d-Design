import express from "express";
import DesignModel from "../models/design/design.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";
import UserModel from "../models/user/user.ts";
import IUser from "../models/user/types.ts";

let paginateOptions = {
    page: 1,
    limit: 7,

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

router.route("/save").post(authMiddleware, async (req, res) => {
    // setTimeout(() => {
    if (req.user) {
        const { model } = req.body;
        delete model.activeEditorTab

        const user = req.user as IUser
        const user_id = (await UserModel.findOne({ username: user.username, type: user.type }, { _id: 1 }))?._id.toString()
        const new_design = new DesignModel({ ...model, owner: user_id })
        new_design.save().then(() => {
            res.status(200).json({ model_id: new_design.id, title: new_design.title, owner: req.user });
        }).catch(e => {
            res.status(500).json({ message: e });
        })
    }
    else {
        res.status(401).json({ result: false, message: "Unauthorized" });
    }
    // }, 1000)

})

export default router;