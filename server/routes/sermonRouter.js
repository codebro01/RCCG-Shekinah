import express from 'express';
import { upload } from '../config/multer.js';
import {uploadSermon, getAllSermons, getSingleSermon, updateSermon, deleteSermon } from '../controllers/index.js'
const Router = express.Router();

const uploadFiles = upload.fields([
    {name: 'images', maxCount: 5},
    {name: 'audio', maxCount: 1},
])

Router.route('/')
    .get(getAllSermons);
Router.post('/', uploadFiles, uploadSermon);
Router.route('/:id')
    .get(getSingleSermon)
    .patch(updateSermon)
    .delete(deleteSermon);


    export default Router;