// import validator from 'validator'

import { model, Schema } from 'mongoose';


const sermonSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Sermon title is required']
    },
    message: {
        type: String,
    },
    preacher: {
        type: String,
        required: [true, 'Preacher is required']

    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    audioUrl: {
        type: String,
    },
    imagesUrl: {
        type: Array,
        required: [true, 'Please upload an image to generate image url']

    }
}, {timestamps: true})

export const Sermon = model('sermon', sermonSchema)