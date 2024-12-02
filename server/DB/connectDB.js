import mongoose from "mongoose";

export const connectDB = (URI) => {
    return mongoose.connect(URI)
}