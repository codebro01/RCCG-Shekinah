import { StatusCodes } from "http-status-codes";
import { Event } from "../model/eventModel.js";
import {User} from "../model/userModel.js";
import { BadRequestError, NotFoundError} from "../errors/index.js";
import { cloudinaryImageUploader, pagePaginationHelper } from "../utils/index.js";
import { checkPermissions } from "../middlewares/authenticationMiddleware.js";


export const getAllEvents = async (req, res) => {

    
    const {skip, pageLimit} = pagePaginationHelper(req.query.page, req.query.limit);
    const events = await Event.find({}).sort('-createdAt').skip(skip).limit(pageLimit);

    res.status(StatusCodes.OK).json({ events });
}

console.log('shown me mercy')
export const createEventController = async (req, res, next) => {

//    await Event.deleteMany({});

    cloudinaryImageUploader(req, res, next, 'event_images', { Coll: Event})



}

export const getSingleEvent = async (req, res, next) => {
    const { id: eventID } = req.params;


    const event = await Event.findById({ _id: eventID });
    if (!event) return next(new NotFoundError('Event not found'));

    res.status(StatusCodes.OK).json({ event })
}

export const updateEvent = async (req, res, next) => {
    const { id: eventID } = req.params;
    const {userID} = req.user;
    const user = await User.findById({_id: userID});
    checkPermissions(10011)
    const event = await Event.findById({ _id: eventID });
    if (!event) return next(new NotFoundError('Event not found'));
    const updateEvent = await Event.findOneAndUpdate({_id: event._id, createdBy: userID}, {...req.body}, {new: true, runValidators: true})
    res.status(StatusCodes.OK).json({ event: updateEvent });


}

export const deleteEvent = async (req, res, next) => {
    checkPermissions(10011);
    const {id: eventID} = req.params;
    const event = await Event.findById({_id: eventID})
    if (!event) return next(new NotFoundError(`Event with id: ${eventID} does not exist`));
    console.log(req.user.role)
    await Event.findOneAndDelete({_id: eventID});
    res.status(StatusCodes.OK).json({message: `Event with ${eventID} has been successfully Deleted`});
}