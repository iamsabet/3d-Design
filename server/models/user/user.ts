import mongoose, { Schema, model, InferSchemaType } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import IUser from "./types";

const userSchema = new Schema<IUser>({
    id: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    type: { type: String, required: true },
    username: { type: String, required: true, },
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    profilePic: { type: String, default: null },
    email: { type: String, default: null },

}, { timestamps: true })

userSchema.plugin(mongoosePaginate)

type UserSchemaType = InferSchemaType<typeof userSchema>

const UserModel = model<UserSchemaType, mongoose.PaginateModel<UserSchemaType>>('User', userSchema, 'user')

export default UserModel;
