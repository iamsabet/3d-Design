import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user/user.ts';

const authMiddleWare = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.toString().startsWith("Bearer ")) {
        const accessToken = req.headers.authorization.toString().split("Bearer ")[1]

        try {
            const profile = await UserModel.findOne({ accessToken }, { username: 1, name: 1, fullName: 1, profilePic: 1, type: 1, _id: 0, })
            if (profile) {
                req.user = profile
                next()
            }
            else
                res.send({ result: false, message: "Unauthorized" }).status(401)

        } catch (e) {
            res.send({ result: false, message: JSON.stringify(e) }).status(500)
        }
    }
    else {
        res.send({ result: false, message: "Unauthorized" }).status(401)
    }
}
export default authMiddleWare;