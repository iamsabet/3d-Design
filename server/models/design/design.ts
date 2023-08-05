import mongoose, { Schema, model, InferSchemaType } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import IDesign from "./types";

const designSchema = new Schema<IDesign>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: Boolean, required: true },
    color: { type: String, required: true },
    isLogoTexture: { type: Boolean, required: true },
    isFullTexture: { type: Boolean, required: true },
    logoDecal: { type: String, required: true },
    fullDecal: { type: String, required: true },
    leftDecal: { type: String, required: true },
    rightDecal: { type: String, required: true },
    uploadSelectedTab: { type: String, required: true },
    activeFilterTab: {
        type: {
            logoShirt: { type: Boolean, required: true },
            stylishShirt: { type: Boolean, required: true },
            leftLogo: { type: Boolean, required: true },
            rightLogo: { type: Boolean, required: true }
        }, required: true
    },
    logoPosition: { type: String, required: true },
    modelRotation: { type: String, required: true },

}, { timestamps: true })

designSchema.plugin(mongoosePaginate)

designSchema.pre('save', async function (next) {
    const randomInteger = (x: number) => {
        return Math.floor(Math.random()) + x;
    };
    this.id = "T-" + Math.random()
        .toString(32)
        .substring(2, randomInteger(14));
    next();
})
type DesingSchemaType = InferSchemaType<typeof designSchema>

const DesignModel = model<DesingSchemaType, mongoose.PaginateModel<DesingSchemaType>>('Design', designSchema, 'design')

export default DesignModel;
