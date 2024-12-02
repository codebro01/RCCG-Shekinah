import mongoose,{Schema, model} from 'mongoose';

const EventSchema = new Schema({
    title: {
        type: String, 
        required: [true, `Name is required`], 
        maxlength: 500, 
    },
    date: {
        type: Date,
        required: true, 
    },
    message: {
        type: String,
        required: true, 
    },
    imagesUrl: [{
        type: String, 
        required: true
    }], 
    createdBy : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    }
}, {timestamps: true})

EventSchema.virtual('status').get(function() {
    const currentDate = new Date();

    if(this.date > currentDate) return 'upcoming'
    
    else if(this.date.toDateString() === currentDate.toDateString()) return 'ongoing'
    else 'concluded'

})

export const Event = model("Event", EventSchema);
