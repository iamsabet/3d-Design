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
                res.status(401).json({ result: false, message: "Unauthorized" })

        } catch (e) {
            res.status(500).json({ result: false, message: JSON.stringify(e) })
        }
    }
    else {
        res.status(401).json({ result: false, message: "Unauthorized" })
    }
}
export default authMiddleWare;