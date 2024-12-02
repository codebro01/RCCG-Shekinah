import express from 'express';
import { createPost, getSinglePost, getAllPosts, updatePost, deletePost } from "../controllers/index.js";
const Router = express.Router();
import { upload } from "../config/multer.js";

Router.route('/')
    .get(getAllPosts);
Router.post('/', upload.array('images', 5), createPost)
Router.route('/:id')
    .get(getSinglePost)
    .patch(updatePost)
    .delete(deletePost)

export default Router;

