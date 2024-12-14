import { Blog } from "../model/blogModel.js";

import { cloudinaryImageUploader, pagePaginationHelper } from "../utils/index.js";
import { User } from "../model/userModel.js"
import { checkPermissions } from "../middlewares/authenticationMiddleware.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { Types } from 'mongoose';

const createPost = async (req, res, next) => {
    checkPermissions(10011);
    cloudinaryImageUploader(req, res, next, 'blog_images', { Coll: Blog })
}


const getSinglePost = async (req, res, next) => {
    const { id: postID } = req.params;
    const post = await Blog.findById({ _id: postID });
    if (!post) return next(new BadRequestError(`There is not post with id: ${postID}`));
    res.status(StatusCodes.OK).json({ post })
}


const getAllPosts = async (req, res) => {
    const {skip, pageLimit} = pagePaginationHelper(req.query.page, req.query.limit);
    const posts = await Blog.find({}).sort('-createdAt').skip(skip).limit(limit);
    res.status(StatusCodes.OK).json({ posts })
}


const updatePost = async (req, res, next) => {
    checkPermissions(10011);

    const { id: postID } = req.params;
    if (!Types.ObjectId.isValid(postID)) return next(new NotFoundError('Invalid ObjectId format.'));

    if (!postID) return next(new BadRequestError(`There is not post id provided`));
    const post = await Blog.findById({ _id: postID });
    if (!post) return next(new BadRequestError(`There is not post with id: ${postID}`));
    const updatedPost = await Blog.findOneAndUpdate({ _id: postID }, { ...req.body }, { new: true, runValidators: true });
    res.status(StatusCodes.OK).json({ updatedPost })
}



const deletePost = async (req, res, next) => {
    checkPermissions(10011);

    const { id: postID } = req.params;

    if (!Types.ObjectId.isValid(postID)) return next(new NotFoundError("Invalid ObjectId format"));
    if (!postID) return next(new BadRequestError(`There is not post id provided`));
    const post = await Blog.findById({ _id: postID });
    if (!post) return next(new BadRequestError(`There is not post with id: ${postID}`));
    const deletedPost = await Blog.findByIdAndDelete({ _id: postID });
    res.status(StatusCodes.OK).json({ deletedPost })
}

export { createPost, getSinglePost, getAllPosts, updatePost, deletePost }