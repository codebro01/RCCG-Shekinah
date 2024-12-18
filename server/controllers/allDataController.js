import { Event } from "../model/eventModel.js";
import { Blog } from "../model/blogModel.js";
import { Gallery } from "../model/galleryModel.js";
import { Sermon } from "../model/sermonModel.js";
import { StatusCodes } from "http-status-codes";
import { pagePaginationHelper } from "../utils/index.js";

export const allDataController = async (req, res) => {
    const { skip, pageLimit, currentPage } = pagePaginationHelper(req.query.page, req.query.limit);
    try {
        const [eventsData, eventsTotalItems] = await Promise.all([
            Event.find({}).sort('-createdAt').skip(skip).limit(pageLimit),
            Event.countDocuments()
        ]);
        const [postsData, postsTotalItems] = await Promise.all([
            Blog.find({}).sort('-createdAt').skip(skip).limit(pageLimit),
            Blog.countDocuments()
        ]);
        const [galleryData, galleryTotalItems] = await Promise.all([
            Gallery.find({}).sort('-createdAt').skip(skip).limit(pageLimit),
            Gallery.countDocuments()
        ])
        const [sermonsData, sermonsTotalItems] = await Promise.all([
            Sermon.find({}).sort('-createdAt').skip(skip).limit(pageLimit),
            Sermon.countDocuments()
        ])

        res.status(StatusCodes.OK).json({
            events: {
                 eventsData, 
                totalItems: eventsTotalItems,
                currentPage, 
                pageLimit,
            },
            posts: {
                postsData, 
                totalItems: postsTotalItems,
                currentPage, 
                pageLimit,
            },
            gallery: {
                galleryData, 
                totalItems: galleryTotalItems,
                currentPage, 
                pageLimit,
            },
            sermons: {
                sermonsData, 
                totalItems: sermonsTotalItems,
                currentPage, 
                pageLimit,
            },
        })
    }
    catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
} 