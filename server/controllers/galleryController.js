import { Gallery } from "../model/galleryModel.js";
import { StatusCodes } from 'http-status-codes';
import { cloudinaryImageUploader, pagePaginationHelper } from "../utils/index.js";
import { NotFoundError } from '../errors/index.js';
import cloudinary from '../config/cloudinary.js';


export const getAllImages = async (req, res) => {
    const {skip, limit} = pagePaginationHelper(req.query.page, req.query.limit);

    const gallery = await Gallery.find({}).sort('-createdAt').skip(skip).limit(limit);
    res.status(StatusCodes.CREATED).json({ gallery })
}

export const uploadImages = async (req, res, next) => {
    cloudinaryImageUploader(req, res, next, 'gallery_images', { Coll: Gallery });
}

export const deleteImage = async (req, res, next) => {

    const { eventID } = req.params;
    const { imageUrl } = req.body;
    const event = await Gallery.findById({ _id: eventID });
    if (!event) return next(new NotFoundError(`No event with eventID:  ${eventID}`));
    const gallery = await Gallery.findById({ _id: eventID });

   

    const isImageExist = gallery.imagesUrl.find((image) => image === imageUrl);
    
        if (!isImageExist) return next(new NotFoundError(`No image found`));


    event.imagesUrl = event.imagesUrl.filter((url) => url !== imageUrl);

    await event.save();

    const publicId = imageUrl.split('/').pop().split('.')[0]
    await cloudinary.uploader.destroy(`gallery_images/${publicId}`);
    res.status(200).json({ message: 'Image deleted successfully', imagesUrl: event.imagesUrl });
}
