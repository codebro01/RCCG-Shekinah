import { Event } from "../model/eventModel.js";
import { Blog } from "../model/blogModel.js";
import { Gallery } from "../model/galleryModel.js";
import { Sermon } from "../model/sermonModel.js";
import { StatusCodes } from "http-status-codes";
import { pagePaginationHelper } from "../utils/index.js";

export const allDataController  = async (req, res) => {
    const {skip, limit} = pagePaginationHelper(req.query.page, req.query.limit);
    const events = await Event.find({}).sort('-createdAt').skip(skip).limit(limit);
    const posts = await Blog.find({}).sort('-createdAt').skip(skip).limit(limit);
    const gallery = await Gallery.find({}).sort('-createdAt').skip(skip).limit(limit);
    const sermons = await Sermon.find({}).sort('-createdAt').skip(skip).limit(limit);


    res.status(StatusCodes.OK).json({events, posts, gallery, sermons});
} 