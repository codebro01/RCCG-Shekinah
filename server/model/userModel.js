import { Schema, model } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: Number,
        required: [true, 'Please provide password and password must include only numbers'],
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least 5 Characters that includes, uppercase, lowercase, number and special characters'],
        min: [6, "Password must be more than 5 characters"],
    },
    role: {
        type: Number,
        default: 10022,
        enum: {
            values: [10011, 10022],
            message: "invalid role assigned"
        },

    }
}, { timestamps: true });


UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
     this.password =  await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePwd = function(password) {
    const compare =  bcrypt.compare(password, this.password);
    return compare;
}


const User = model('User', UserSchema);
export {User};


