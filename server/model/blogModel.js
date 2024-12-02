import mongoose, {Schema} from 'mongoose';


const BlogSchema = new Schema({
    title: {
        type: String, 
        required: [true, 'Please blog title is required']
    }, 
    message: {
        type: String, 
        required: [true, 'Please blog requires post information']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }, 
    imagesUrl: [], 
},{ timestamps: true});

export const Blog = mongoose.model('blog', BlogSchema);