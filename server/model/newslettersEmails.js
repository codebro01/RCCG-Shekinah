import {model, Schema} from 'mongoose';
import validator from 'validator';

 const newsletterEmailSchema = new Schema({
    email: {
        type: String, 
        required: [true, 'Please enter a valid email, email cannot be empty'],
        validate: {
            validator: validator.isEmail, 
            message: "Please Enter a valid email address"
        }, 
        unique: true
    }
})

 export const Email = model('Email', newsletterEmailSchema)