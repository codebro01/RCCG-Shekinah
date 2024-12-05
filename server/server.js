import 'dotenv/config'
import 'express-async-error';
import express from 'express';
import { connectDB } from './DB/connectDB.js';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';
import { notFound } from './middlewares/notFoundMiddleware.js';
import { eventRouter, userRouter, authRouter, blogRouter, sermonRouter, imagesRouter, adminHomeRouter, allDataRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authenticationMiddleware.js';
import { customErrorHandler } from './middlewares/errorMiddleware.js';
import cors from 'cors';
const app = express();




//! middlewares 
const __dirname = fileURLToPath(import.meta.url);
app.use(cookieParser(process.env.JWT_SECRET))
// app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, "..", "..", "dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin = ['http://localhost:5173', 'https://rccg-shekinah-api.onrender.com'];

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrigin.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS......'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/event', authMiddleware, eventRouter);
app.use('/api/v1/post', authMiddleware, blogRouter);
app.use('/api/v1/sermon', authMiddleware, sermonRouter);
app.use('/api/v1/images', authMiddleware, imagesRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin-home', authMiddleware, adminHomeRouter);
app.use('/api/v1/alldata', allDataRouter);








app.get('*', (req, res) => {
    res.sendFile(join(__dirname, "..", "..", "dist", "index.html"))
})

app.use(notFound);
app.use(customErrorHandler);


const PORT = process.env.PORT || 3500;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(PORT, () => console.log('App is listening at PORT ' + PORT));

    }
    catch (err) {
        console.log(err)
    }
}

start();







