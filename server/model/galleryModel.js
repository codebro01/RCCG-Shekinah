import { model, Schema } from 'mongoose';


const GallerySchema = new Schema({
    eventName: {
        type: String,
        required: [true, 'Event name is required'],
    },
    imagesUrl: {
        type: Array,
        required: [true, 'Event name is required'],
    }, 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, {timestamps: true});


export const Gallery = model("gallery", GallerySchema);