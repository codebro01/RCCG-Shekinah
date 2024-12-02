import { Event } from "../model/eventModel.js";
import { Blog } from "../model/blogModel.js";
import { Gallery } from "../model/galleryModel.js";
import { Sermon } from "../model/sermonModel.js";
import { StatusCodes } from "http-status-codes";

export const allDataController  = async (req, res) => {
    const events = await Event.find({}).sort('-createdAt');
    const posts = await Blog.find({}).sort('-createdAt');
    const gallery = await Gallery.find({}).sort('-createdAt');
    const sermons = await Sermon.find({}).sort('-createdAt');


    res.status(StatusCodes.OK).json({events, posts, gallery, sermons});
} 